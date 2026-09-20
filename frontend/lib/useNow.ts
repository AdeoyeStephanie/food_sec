'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current time, refreshed on an interval so time-derived UI
 * (e.g. open/closed badges) re-renders as the clock advances.
 * Defaults to a 60-second tick.
 */
export function useNow(intervalMs = 60_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
