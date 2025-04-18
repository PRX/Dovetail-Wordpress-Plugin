/**
 * Format Date into a date based key, eg. YYYY-MM-DD.
 * @param date Date to base key on.
 * @returns Formatted date key.
 */
export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
}
