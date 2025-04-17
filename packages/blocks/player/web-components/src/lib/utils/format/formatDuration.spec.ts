import { formatDuration } from './formatDuration';

describe('lib/convert/string', () => {
  describe('formatDuration', () => {
    test('should convert parts to integers, and reverse order.', () => {
      const result1 = formatDuration(42);
      const result2 = formatDuration(105);
      const result3 = formatDuration(3616);

      expect(result1).toBe('00:42');
      expect(result2).toBe('01:45');
      expect(result3).toBe('1:00:16');
    });

    test('should return duration strings.', () => {
      const result = formatDuration('12:34');

      expect(result).toBe('12:34');
    });

    test('should handle numeric string input.', () => {
      const result = formatDuration('120');

      expect(result).toBe('02:00');
    });

    test('should handle input of 0.', () => {
      const result = formatDuration(0);

      expect(result).toBe('00:00');
    });
  });
});
