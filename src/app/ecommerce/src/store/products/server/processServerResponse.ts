import { Notification, Notifications } from "common";
import { ErrorResponse, isErrorResponse } from "./errorHandlingMiddleware";

/**
 * This function handles every response that was made using the errorHandlingMiddleware
 * function in a Server Function.
 */
export async function parseServerResponse<T>(
  promise: Promise<T | ErrorResponse>,
  onFail?: () => unknown,
): Promise<T | null> {
  try {
    const result = await promise;

    if (isErrorResponse(result)) {
      throw result.error;
    }

    return result;
  } catch (error) {
    Notifications.instance.add(
      new Notification({
        text: String(error),
        title: "Error",
        type: "danger",
      }),
    );

    onFail?.();

    return null;
  }
}
