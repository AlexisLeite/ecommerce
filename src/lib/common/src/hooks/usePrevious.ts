import { useRef } from "react";

/**
 * @public
 *
 * Mantains an updated reference which points to the previous passed value to the hook
 */
export function usePrevious<T>(what: T) {
  const ref = useRef<T | undefined>(undefined);
  const prevRef = useRef<T | undefined>(undefined);

  ref.current = prevRef.current;
  prevRef.current = what;

  return ref;
}
