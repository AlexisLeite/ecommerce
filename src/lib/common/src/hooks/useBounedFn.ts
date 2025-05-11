import { useRef, useCallback, useEffect } from "react";

export function useBouncedFn<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300,
): (...args: Parameters<T>) => void {
  const timer = useRef<ReturnType<typeof setTimeout>>(-1 as any);

  const bounced = useCallback((...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return bounced;
}
