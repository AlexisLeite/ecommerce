import { SetStateAction } from "react";
import { Callback, EventEmitter, Map, UnSubscriber } from ".";
import { useSubscription } from "../util/useSubscription";

type Setter<T> = (prevState: T) => T;

export function isSetter<T>(data: SetStateAction<T>): data is Setter<T> {
  return typeof data === "function";
}

/**
 * @private
 */
type EmitterState<Events extends Map> = {
  [K in keyof Events]: Events[K];
};

/**
 * Extends EventEmitter to manage and emit events with state persistence.
 * This class allows emitting and listening to typed events while also keeping
 * a state that can be accessed synchronously for each event.
 *
 * @param initialState - If given will be passed to subscriptions
 *
 * @template Events - A mapping of event names to their associated data types.
 * @extends EventEmitter<Events>
 */
export class StatefulEmitter<Events extends Map> extends EventEmitter<Events> {
  protected state = {} as EmitterState<Events>;

  constructor(initialState?: Partial<Events>) {
    super();

    this.state = Object.assign({}, initialState) as Events;
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.state[event] = data;
    super.emit(event, data);
  }

  on<K extends keyof Events>(event: K, cb: Callback<Events, K>): UnSubscriber {
    if (this.state[event]) this.emit(event, this.state[event]);

    return super.on(event, cb);
  }

  once<K extends keyof Events>(
    event: K,
    cb: Callback<Events, K>,
  ): UnSubscriber {
    if (this.state[event]) {
      this.emit(event, this.state[event]);

      /**
       * Given that the information has already been sent, the subscription is not necessary
       */
      return () => {};
    }

    return super.once(event, cb);
  }

  /**
   * Retrieves the stored state for a given event
   */
  getState<K extends keyof Events>(event: K) {
    return this.state[event];
  }

  /**
   * Just an alias for emit, with the advantage that can be called with a callback as second parameter in which case behaves exactly as react's setState.
   */
  setState<K extends keyof Events>(
    event: K,
    data: SetStateAction<Events[K]>,
  ): void {
    const actualData = isSetter(data) ? data(this.getState(event)) : data;

    this.emit(event, actualData);
  }

  /**
   * Allows to consume an event stream as a real time updated state
   */
  useState = <K extends keyof Events>(event: K) => {
    return useSubscription({
      getInitialState: () => this.state[event],
      makeSubscription: (setState) => {
        return this.on(event, setState);
      },
    });
  };
}
