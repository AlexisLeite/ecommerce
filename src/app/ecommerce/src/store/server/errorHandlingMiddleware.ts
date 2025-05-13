export type ErrorResponse = { error: string };

export function isErrorResponse(r: any): r is ErrorResponse {
  return typeof r && r && typeof (r as any).error === "string";
}

export async function errorHandlingMiddleware<T>(cb: () => Promise<T>) {
  try {
    return await cb();
  } catch (error) {
    return { error: String(error) };
  }
}
