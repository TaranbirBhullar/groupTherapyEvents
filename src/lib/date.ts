export function toTimestamp(isoDate: string): number {
  return new Date(isoDate).getTime();
}

export function formatEventDate(isoDate: string, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone
  }).format(new Date(isoDate));
}
