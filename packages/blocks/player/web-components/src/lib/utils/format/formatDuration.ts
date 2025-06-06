/**
 * Format seconds as duration string, `[HH:]MM:SS`.
 *
 * @param totalSeconds Seconds as number.
 * @returns Formatted duration string.
 */
export const formatDuration = (inputSeconds: number | string) => {
  let duration = '00:00';

  if (typeof inputSeconds === 'string' && inputSeconds.indexOf(':') > -1) {
    return inputSeconds;
  }

  const totalSeconds =
    typeof inputSeconds === 'string'
      ? parseInt(inputSeconds, 10)
      : inputSeconds;

  if (typeof totalSeconds === 'number' && totalSeconds > 0) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    duration = [
      ...(hours ? [hours] : []),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ].join(':');
  }

  return duration;
};
