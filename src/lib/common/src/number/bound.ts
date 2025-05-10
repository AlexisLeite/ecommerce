/**
 * @public
 *
 * Ensures a number falls within the specified range.
 *
 * @param n - The number to bound.
 * @param min - The minimum value of the range, defaulting to 0.
 * @param max - The maximum value of the range, defaulting to Infinity.
 * @returns The original number `n` if it's within the range `[min, max]`,
 *          `min` if `n` is less than `min`, or `max` if `n` is greater than `max`.
 */
export function bound(n: number, min = 0, max = Infinity) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}
