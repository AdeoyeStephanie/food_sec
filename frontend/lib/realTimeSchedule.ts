/**
 * Real-Time Schedule & Time Synchronization Engine for Pantree
 * 
 * Synchronizes pantry open/closed/closing-soon status and relative update times
 * with real time (America/New_York Baltimore timezone).
 */

export interface RealTimeSchedule {
  isOpenNow: boolean;
  isClosingSoon: boolean;
  isOpenTonight: boolean;
  isOpenToday: boolean;
  status: 'open' | 'closing_soon' | 'open_tonight' | 'closed';
  label: string;
  badgeClass: string;
  dotClass: string;
  todayHoursDisplay: string;
}

const DAY_NAME_MAP: Record<string, number> = {
  sun: 0, sunday: 0,
  mon: 1, monday: 1,
  tue: 2, tues: 2, tuesday: 2,
  wed: 3, wednesday: 3,
  thu: 4, thur: 4, thurs: 4, thursday: 4,
  fri: 5, friday: 5,
  sat: 6, saturday: 6,
};

const DAY_DISPLAY_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_DISPLAY_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/**
 * Parse a time string like "9am", "9:30am", "12pm", "4pm", "1:30" into minutes from midnight (0..1439).
 */
export function parseTimeToMinutes(raw: string, defaultIsPm: boolean = false): number {
  const s = raw.trim().toLowerCase();
  const isPm = s.includes('pm') || (defaultIsPm && !s.includes('am'));
  const isAm = s.includes('am');
  const clean = s.replace(/[ap]m/g, '').trim();
  const parts = clean.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts.length > 1 ? parseInt(parts[1], 10) : 0;
  
  if (isNaN(hours)) return 0;
  if (isPm && hours < 12) hours += 12;
  if (isAm && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

/**
 * Format minutes from midnight to a 12-hour display like "9:00 AM" or "4:00 PM"
 */
export function formatMinutesToDisplay(minutes: number): string {
  const h24 = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mPad = m < 10 ? `0${m}` : `${m}`;
  return `${h12}:${mPad} ${period}`;
}

interface ScheduleWindow {
  days: number[];
  startMinutes: number;
  endMinutes: number;
  rawText: string;
}

/**
 * Parse hours string into structured schedule windows
 */
export function parseScheduleWindows(hoursText: string): ScheduleWindow[] {
  if (!hoursText) return [];
  const segments = hoursText.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
  const windows: ScheduleWindow[] = [];

  for (const seg of segments) {
    const s = seg.toLowerCase();

    // 1. Extract time range (e.g. "9am to 4pm", "10am-1pm", "5 to 8pm", "9:00 AM – 6:00 PM")
    const match = seg.match(/(\d+(?::\d+)?\s*(?:am|pm)?)\s*(?:to|-|–)\s*(\d+(?::\d+)?\s*(?:am|pm)?)/i);
    if (!match) continue;

    const startStr = match[1];
    const endStr = match[2];
    const endIsPm = endStr.toLowerCase().includes('pm') || (!endStr.toLowerCase().includes('am') && parseInt(endStr, 10) < 9);
    let startIsPm = startStr.toLowerCase().includes('pm');
    if (!startStr.toLowerCase().includes('am') && !startStr.toLowerCase().includes('pm')) {
      const rawStart = parseInt(startStr, 10);
      const rawEnd = parseInt(endStr, 10);
      if (endIsPm && rawStart > rawEnd && rawStart < 12) {
        startIsPm = false;
      } else {
        startIsPm = endIsPm;
      }
    }

    const startMinutes = parseTimeToMinutes(startStr, startIsPm);
    const endMinutes = parseTimeToMinutes(endStr, endIsPm);

    // 2. Extract days
    let days: number[] = [];
    if (s.includes('daily') || s.includes('everyday')) {
      days = [0, 1, 2, 3, 4, 5, 6];
    } else if (s.includes('today')) {
      days = [new Date().getDay()];
    } else {
      // Check day range (e.g. "mon to thu", "mon-fri", "mon-wed")
      const rangeMatch = s.match(/(mon|tue|wed|thu|fri|sat|sun)[a-z]*\s*(?:to|-)\s*(mon|tue|wed|thu|fri|sat|sun)[a-z]*/);
      if (rangeMatch) {
        const start = DAY_NAME_MAP[rangeMatch[1]];
        const end = DAY_NAME_MAP[rangeMatch[2]];
        let cur = start;
        while (true) {
          days.push(cur);
          if (cur === end) break;
          cur = (cur + 1) % 7;
        }
      } else {
        // Individual days (e.g. "tuesday & thursday", "wednesday", "saturday")
        const found = new Set<number>();
        const words = s.split(/[\s,&/]+/);
        for (const w of words) {
          for (const [k, v] of Object.entries(DAY_NAME_MAP)) {
            if (w.startsWith(k)) {
              found.add(v);
              break;
            }
          }
        }
        days = Array.from(found);
      }
    }

    // Default if time found but no explicit day mentioned in segment
    if (days.length === 0) {
      if (windows.length > 0) {
        // Inherit previous window's days if not specified
        days = [...windows[windows.length - 1].days];
      } else {
        days = [1, 2, 3, 4, 5]; // default weekdays
      }
    }

    windows.push({
      days,
      startMinutes,
      endMinutes,
      rawText: seg,
    });
  }

  return windows;
}

/**
 * Evaluates real-time open/closed/closing-soon status for a pantry against current Baltimore clock.
 */
export function evaluateRealTimeSchedule(
  hoursText: string,
  isDemo?: boolean,
  language: 'en' | 'es' = 'en',
  currentDate: Date = new Date()
): RealTimeSchedule {
  // Demo pantries are always simulated as active for evaluation & demonstrations
  if (isDemo) {
    return {
      isOpenNow: true,
      isClosingSoon: false,
      isOpenTonight: true,
      isOpenToday: true,
      status: 'open',
      label: language === 'es' ? '🟢 Despensa Demo en Vivo · Activa' : '🟢 Live Demo · Always Active',
      badgeClass: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
      dotClass: 'bg-emerald-600 animate-pulse',
      todayHoursDisplay: 'Live Demo 24/7',
    };
  }

  const windows = parseScheduleWindows(hoursText);
  if (windows.length === 0) {
    return {
      isOpenNow: false,
      isClosingSoon: false,
      isOpenTonight: false,
      isOpenToday: false,
      status: 'closed',
      label: language === 'es' ? 'Horario a confirmar' : 'Check hours with pantry',
      badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
      dotClass: 'bg-slate-400',
      todayHoursDisplay: hoursText || 'Call for hours',
    };
  }

  const currentDay = currentDate.getDay(); // 0..6
  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  // Find window matching today
  const todayWindow = windows.find((w) => w.days.includes(currentDay));

  if (todayWindow) {
    const { startMinutes, endMinutes } = todayWindow;
    const startStr = formatMinutesToDisplay(startMinutes);
    const endStr = formatMinutesToDisplay(endMinutes);
    const todayDisplay = `${startStr} – ${endStr}`;
    const isOpenTonight = endMinutes >= 17 * 60; // closes 5 PM or later

    // 1. Is it open right now?
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      const remainingMinutes = endMinutes - currentMinutes;

      // Closing soon if less than 45 minutes remaining
      if (remainingMinutes <= 45) {
        return {
          isOpenNow: true,
          isClosingSoon: true,
          isOpenTonight,
          isOpenToday: true,
          status: 'closing_soon',
          label: language === 'es' 
            ? `⚠️ Cierra pronto (${remainingMinutes}m restantes · ${endStr})`
            : `⚠️ Closes Soon (${remainingMinutes}m left · ${endStr})`,
          badgeClass: 'bg-amber-50 text-amber-900 border border-amber-300',
          dotClass: 'bg-amber-600 animate-ping',
          todayHoursDisplay: todayDisplay,
        };
      }

      if (isOpenTonight && currentMinutes >= 16 * 60) {
        return {
          isOpenNow: true,
          isClosingSoon: false,
          isOpenTonight: true,
          isOpenToday: true,
          status: 'open_tonight',
          label: language === 'es'
            ? `🌙 Abierto esta noche · Hasta las ${endStr}`
            : `🌙 Open Tonight · Closes at ${endStr}`,
          badgeClass: 'bg-indigo-50 text-indigo-900 border border-indigo-200',
          dotClass: 'bg-indigo-600 animate-pulse',
          todayHoursDisplay: todayDisplay,
        };
      }

      return {
        isOpenNow: true,
        isClosingSoon: false,
        isOpenTonight,
        isOpenToday: true,
        status: 'open',
        label: language === 'es'
          ? `🟢 Abierto ahora · Cierra a las ${endStr}`
          : `🟢 Open Now · Closes at ${endStr}`,
        badgeClass: 'bg-emerald-50 text-emerald-900 border border-emerald-300',
        dotClass: 'bg-emerald-600 animate-pulse',
        todayHoursDisplay: todayDisplay,
      };
    }

    // 2. Scheduled today, but before opening
    if (currentMinutes < startMinutes) {
      return {
        isOpenNow: false,
        isClosingSoon: false,
        isOpenTonight,
        isOpenToday: true,
        status: 'closed',
        label: language === 'es'
          ? `Abre hoy a las ${startStr}`
          : `Opens Today at ${startStr}`,
        badgeClass: 'bg-sky-50 text-sky-900 border border-sky-200',
        dotClass: 'bg-sky-500',
        todayHoursDisplay: todayDisplay,
      };
    }

    // 3. Closed for today (after closing)
    // Fall through to find next open day
  }

  // Find the next upcoming open window
  let nextWindow: ScheduleWindow | undefined;
  let targetNextDay = (currentDay + 1) % 7;

  for (let i = 1; i <= 7; i++) {
    const checkDay = (currentDay + i) % 7;
    const found = windows.find((w) => w.days.includes(checkDay));
    if (found) {
      nextWindow = found;
      targetNextDay = checkDay;
      break;
    }
  }

  const nextDayName = language === 'es' ? DAY_DISPLAY_ES[targetNextDay] : DAY_DISPLAY_EN[targetNextDay];
  const nextTimeStr = nextWindow ? formatMinutesToDisplay(nextWindow.startMinutes) : '';
  const closedLabel = nextWindow
    ? language === 'es'
      ? `Cerrado · Abre el ${nextDayName} a las ${nextTimeStr}`
      : `Closed · Opens ${nextDayName} at ${nextTimeStr}`
    : language === 'es'
    ? 'Cerrado hoy'
    : 'Closed Today';

  return {
    isOpenNow: false,
    isClosingSoon: false,
    isOpenTonight: false,
    isOpenToday: false,
    status: 'closed',
    label: closedLabel,
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200',
    dotClass: 'bg-slate-400',
    todayHoursDisplay: hoursText,
  };
}

/**
 * Format relative elapsed time synchronized with real clock
 */
export function formatRelativeTime(
  timeOrMinutes: string | number | undefined,
  language: 'en' | 'es' = 'en',
  nowTimestamp: number = Date.now()
): string {
  if (timeOrMinutes === undefined || timeOrMinutes === null) {
    return language === 'es' ? 'Recién verificado' : 'Verified recently';
  }

  let elapsedMinutes = 0;
  if (typeof timeOrMinutes === 'number') {
    elapsedMinutes = Math.max(0, Math.floor(timeOrMinutes));
  } else {
    const parsed = new Date(timeOrMinutes).getTime();
    if (isNaN(parsed)) {
      return language === 'es' ? 'Recién verificado' : 'Verified recently';
    }
    elapsedMinutes = Math.max(0, Math.floor((nowTimestamp - parsed) / 60000));
  }

  if (elapsedMinutes < 2) {
    return language === 'es' ? 'Actualizado justo ahora' : 'Updated just now';
  }
  if (elapsedMinutes < 60) {
    return language === 'es' ? `Actualizado hace ${elapsedMinutes}m` : `Updated ${elapsedMinutes}m ago`;
  }
  const hours = Math.floor(elapsedMinutes / 60);
  if (hours < 24) {
    return language === 'es' ? `Actualizado hace ${hours}h` : `Updated ${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return language === 'es' ? `Actualizado hace ${days}d` : `Updated ${days}d ago`;
}
