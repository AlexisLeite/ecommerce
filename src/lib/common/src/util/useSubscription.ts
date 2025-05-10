import { useState, type SetStateAction, useEffect, Dispatch } from "react";
import { UnSubscriber } from "../EventEmitter";

/**
 * A subscriber with a method to create a subscription.
 * @typeParam T - The type of the state being managed by the subscription.
 */
type Subscriber<T> = {
  /**
   * Creates a subscription and returns an UnSubscriber function.
   * @param setState - A function to update the state.
   * @returns A function to unsubscribe the current subscription.
   */
  makeSubscription(setState: Dispatch<SetStateAction<T>>): UnSubscriber;
};

/**
 * A subscription with a required method to get the initial state.
 * @typeParam T - The type of the state.
 */
type SubscriptionWithState<T> = {
  /**
   * A required method to get the initial state of the subscription.
   * @returns The initial state of type T.
   */
  getInitialState: () => T /**
   * Creates a subscription and returns an UnSubscriber function.
   * @param setState - A function to update the state.
   * @returns A function to unsubscribe the current subscription.
   */;
  makeSubscription(setState: Dispatch<SetStateAction<T>>): UnSubscriber;
};

/**
 * Hook for managing subscriptions to various data sources.
 *
 * This hook handles subscriptions that can update the component's state whenever the subscribed data changes.
 * The subscriber object should manage the subscription lifecycle, including its creation, state updates, and teardown.
 * It must return a cleanup method to terminate the subscription, ensuring proper resource management.
 *
 * @typeParam T - The type of the state managed by the subscription.
 * @param subscriber.getInitialState The object handling the subscription and state updates.
 * @returns The current state of the subscription, either of type T or undefined.
 */
export function useSubscription<T>(subscriber: SubscriptionWithState<T>): T;
export function useSubscription<T>(subscriber: Subscriber<T>): T | undefined;

/**
 * @internal
 */
export function useSubscription<T>(
  subscriber: SubscriptionWithState<T> | Subscriber<T>,
) {
  const [state, setState] = useState(
    (subscriber as SubscriptionWithState<T>).getInitialState?.(),
  );

  useEffect(() => {
    setState((subscriber as SubscriptionWithState<T>).getInitialState?.());

    return subscriber.makeSubscription(
      setState as unknown as Dispatch<SetStateAction<T>>,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
