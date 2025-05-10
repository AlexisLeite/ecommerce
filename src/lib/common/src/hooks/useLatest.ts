import { useRef } from "react";

/**
 * @public
 *
 * Mantains an updated reference to the element passed as argument
 */
export function useLatest<T>(what: T) {
  const ref = useRef(what);

  if (what !== ref.current) ref.current = what;

  return ref;
}
