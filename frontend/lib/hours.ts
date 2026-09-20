/**
 * Time-aware parsing of free-text pantry hours.
 *
 * Pantry data carries no structured schedule — only strings like
 * "Open Tuesday & Thursday 10am to 1pm" or "Open Mon–Thu 9am to 4pm, Fri 9am to 3pm".
 * This module turns those strings into a weekly schedule (minutes since midnight,
 * per weekday) so open/closed status can be computed live against the current
 * day and time, instead of relying on frozen `open_today` / `open_tonight` flags.
 *
 * Times are interpreted in the viewer's local timezone (via `new Date()`).
 */

export interface DayWindow {
  /** Minutes since local midnight. */
  open: number;
  close: number;
}

/** dayIndex (0=Sun .. 6=Sat) -> list of open windows that day. */
export type WeekSchedule = Record<number, DayWindow[]>;

export interface ParsedHours {
  schedule: WeekSchedule;
  /** True when the text has ordinal-week qualifiers (e.g. "2nd & 4th Wed") we can't resolve exactly. */
  uncertain: boolean;
  /** True when at least one window was extracted. */
  parsed: boolean;
}

export type OpenStatus = 'open' | 'closing_soon' | 'open_tonight' | 'closed';

export interface OpenState {
  status: OpenStatus;
  openNow: boolean;
  uncertain: boolean;
  current: DayWindow | null;
  minutesToClose?: number;
  nextOpen?: { dayIndex: number; open: number };
}

const DAY_ALT =
  '(sundays?|saturdays?|thursdays?|wednesdays?|tuesdays?|mondays?|fridays?|thurs|tues|thur|sun|mon|tue|wed|thu|fri|sat)';

const DAY_INDEX: Record<string, number> = {
  sun: 0, sunday: 0, mon: 1, monday: 1, tue: 2, tues: 2, tuesday: 2,
  wed: 3, weds: 3, wednesday: 3, thu: 4, thur: 4, thurs: 4, thursday: 4,
  fri: 5, friday: 5, sat: 6, saturday: 6,
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function dayIndex(tok: string): number | undefined {
  const t = tok.toLowerCase().replace(/s$/, '');
  return DAY_INDEX[t];
}

function timeToMinutes(hStr: string, mStr: string | undefined, mer: string | null): number {
  let h = parseInt(hStr, 10);
  const m = mStr ? parseInt(mStr, 10) : 0;
  if (mer === 'pm' && h !== 12) h += 12;
  if (mer === 'am' && h === 12) h = 0;
  return h * 60 + m;
}

/** Extract an {open, close} window (in minutes) from a text chunk, or null. */
function extractTime(chunk: string): DayWindow | null {
  const re = /(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)?/gi;
  const toks: { h: string; m?: string; mer: string | null }[] = [];
  let mt: RegExpExecArray | null;
  while ((mt = re.exec(chunk)) !== null) {
    if (mt[0].trim() === '') { re.lastIndex++; continue; }
    const mer = mt[3] ? mt[3].replace(/\./g, '').toLowerCase() : null;
    toks.push({ h: mt[1], m: mt[2], mer });
  }
  if (toks.length < 2) return null;
  const a = toks[0], b = toks[1];
  // Infer missing meridiem from the paired time (e.g. "5 to 8pm" -> 5pm).
  if (!a.mer && b.mer) a.mer = b.mer;
  if (!b.mer && a.mer) b.mer = a.mer;
  if (!a.mer) a.mer = parseInt(a.h, 10) < 12 ? 'am' : 'pm';
  if (!b.mer) b.mer = parseInt(b.h, 10) < 12 ? 'am' : 'pm';
  const open = timeToMinutes(a.h, a.m, a.mer);
  const close = timeToMinutes(b.h, b.m, b.mer);
  if (close <= open) return null;
  return { open, close };
}

/** Extract day indices from a chunk (handles ranges, &-lists, and single days). */
function extractDays(seg: string, todayIndex?: number): number[] {
  const days = new Set<number>();
  let work = seg;
  if (/\bdaily\b/i.test(work)) {
    for (let d = 0; d < 7; d++) days.add(d);
    return [...days];
  }
  if (/\btoday\b/i.test(work) && todayIndex != null) days.add(todayIndex);

  // Ranges: "Mon–Thu", "Mon-Fri", "Mon to Thu".
  const rangeRe = new RegExp(DAY_ALT + '\\s*(?:–|—|-|to)\\s*' + DAY_ALT, 'gi');
  work = work.replace(rangeRe, (_m, a: string, b: string) => {
    const s = dayIndex(a);
    let e = dayIndex(b);
    if (s != null && e != null) {
      if (e < s) e += 7;
      for (let d = s; d <= e; d++) days.add(d % 7);
    }
    return ' ';
  });

  // Remaining single day words (covers "&" and comma lists).
  const singleRe = new RegExp(DAY_ALT, 'gi');
  let mt: RegExpExecArray | null;
  while ((mt = singleRe.exec(work)) !== null) {
    const d = dayIndex(mt[1]);
    if (d != null) days.add(d);
  }
  return [...days];
}

export function parseHoursText(text: string | null | undefined, todayIndex?: number): ParsedHours {
  if (!text) return { schedule: {}, uncertain: false, parsed: false };
  const uncertain = /\b(\d+(?:st|nd|rd|th)|first|second|third|fourth|except|last)\b/i.test(text);
  let s = text.replace(/^\s*open\s+/i, '');
  // Strip ordinal-week / parenthetical qualifiers so their digits/words don't
  // pollute day or time extraction (e.g. "1st & 3rd Saturday" -> "Saturday").
  s = s
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b\d+\s*(?:st|nd|rd|th)\b/gi, ' ')
    .replace(/\b(?:first|second|third|fourth|last)\b/gi, ' ');

  const schedule: WeekSchedule = {};
  const push = (d: number, w: DayWindow) => {
    (schedule[d] = schedule[d] || []).push(w);
  };

  // Comma is used both to separate day lists ("Mon, Wed, Fri 10am to 12pm")
  // and to separate day+time segments ("Mon 9:30-11am, Wed 11am-1pm").
  // Accumulate day-only chunks until a chunk that also carries a time, then
  // apply that time to all accumulated days.
  const segments = s.split(',');
  let pendingDays: number[] = [];
  for (const seg of segments) {
    const days = extractDays(seg, todayIndex);
    const time = extractTime(seg);
    if (!time) {
      pendingDays.push(...days);
      continue;
    }
    const applyDays = [...new Set([...pendingDays, ...days])];
    for (const d of applyDays) push(d, time);
    pendingDays = [];
  }

  return { schedule, uncertain, parsed: Object.keys(schedule).length > 0 };
}

/**
 * Compute the live open/closed state for a pantry's hours text.
 * Returns null when the text can't be parsed (caller should fall back).
 */
export function getOpenState(text: string | null | undefined, now: Date = new Date()): OpenState | null {
  const todayIndex = now.getDay();
  const { schedule, uncertain, parsed } = parseHoursText(text, todayIndex);
  if (!parsed) return null;

  const nowMin = now.getHours() * 60 + now.getMinutes();
  const windows = (schedule[todayIndex] || []).slice().sort((a, b) => a.open - b.open);

  let current: DayWindow | null = null;
  for (const w of windows) {
    if (nowMin >= w.open && nowMin < w.close) {
      current = w;
      break;
    }
  }

  if (current) {
    const minutesToClose = current.close - nowMin;
    let status: OpenStatus = 'open';
    if (minutesToClose <= 60) status = 'closing_soon';
    else if (now.getHours() >= 17) status = 'open_tonight';
    // Ordinal-week schedules aren't open every week — never assert a confident "open".
    if (uncertain) status = 'closing_soon';
    return { status, openNow: true, uncertain, current, minutesToClose };
  }

  // Find the next opening within the next 7 days for a helpful "Closed · Opens…" label.
  let nextOpen: { dayIndex: number; open: number } | undefined;
  for (let i = 0; i < 7; i++) {
    const d = (todayIndex + i) % 7;
    const dayWindows = (schedule[d] || []).slice().sort((a, b) => a.open - b.open);
    for (const w of dayWindows) {
      if (i === 0 && w.open <= nowMin) continue; // already past today
      nextOpen = { dayIndex: d, open: w.open };
      break;
    }
    if (nextOpen) break;
  }

  return { status: 'closed', openNow: false, uncertain, current: null, nextOpen };
}

/** Format minutes-since-midnight as "1:00 PM". */
export function formatMinutes(min: number): string {
  let h = Math.floor(min / 60);
  const m = min % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}

export function dayName(index: number): string {
  return DAY_NAMES[index] ?? '';
}
