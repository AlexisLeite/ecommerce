/**
 * Always returns an array
 */
export function arrayOrArray<T>(e: T | T[]) {
  return Array.isArray(e) ? e : [e];
}
