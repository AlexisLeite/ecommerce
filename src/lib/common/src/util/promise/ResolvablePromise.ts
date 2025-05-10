export type TResolvablePromise<T> = {
  promise: Promise<T>;
  resolve: (w: T) => unknown;
};

export function resolvablePromise<T>(): TResolvablePromise<T> {
  let resolve: ((w: T) => void) | null = null;

  const promise = new Promise<T>((r) => {
    resolve = r;
  });

  return { promise, resolve: resolve! };
}
