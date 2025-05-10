/**
 * @public
 *
 * Tries to parse `value` to a number. If succeeds, returns the parsed value or else, returns the `defaultValue`
 *
 * @param value - The value to parse to a number. If is already a number, returns it without modifications.
 * @param defaultValue - The value that must be returned in case of parse failure. Defaults to 0.
 */
export function noNaN(value: any, defaultValue = 0) {
  try {
    const v = typeof value === "number" ? value : Number.parseInt(value, 10);

    if (Number.isNaN(v)) return defaultValue;
    return v;
  } catch (e) {
    return defaultValue;
  }
}
