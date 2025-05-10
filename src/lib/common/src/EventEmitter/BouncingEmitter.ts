import { SetStateAction } from "react";
import { Map } from ".";
import { StatefulEmitter, isSetter } from "./StatefulEmitter";

type BouncingMap<Events extends Map> = {
  [K in keyof Events]: number;
};

const NullObject = Symbol("NullObject");

type ThrottlingMap<Events extends Map> = {
  [K in keyof Events]: Events[K] | typeof NullObject;
};

type ThrottlingMarkers<Events extends Map> = {
  [K in keyof Events]: boolean;
};

export type DebounceOptions = Partial<{ timing: number }>;

export type ThrottleOptions = Partial<{
  emitOnStart?: boolean;
  timing: number;
}>;

/**
 * @public
 *
 * The BouncingEmitter class is an extension of EventEmitter which adds debouncing and throttling functionality.
 *
 * @typeParam — Events - An extension of Map where the key is the event name and the value is the type of data associated with that event.
 */
export class BouncingEmitter<
  Events extends Map,
> extends StatefulEmitter<Events> {
  protected bouncingTimeouts = {} as BouncingMap<Events>;

  protected defaultTiming = 100;

  /**
   * Debounces a event emit with until there is no call to the emit methods by (timing)ms. Take the following event throttling, where each E is a call to this method and each character represents 20ms:
   *
   * E_E_E_E_E_E_E_E_E
   *
   * If timing is configured to 100ms, which is the default, the emission will occur as follows:
   *
   * _____________________E
   */
  debounce<K extends keyof Events>(
    event: K,
    data: Events[K],
    configuration?: DebounceOptions,
  ) {
    clearTimeout(this.bouncingTimeouts[event]);
    this.bouncingTimeouts[event] = setTimeout(() => {
      this.emit(event, data);
    }, configuration?.timing ?? this.defaultTiming) as unknown as number;
  }

  /**
   * Throttles a event emit with the warranty that the data will be emitted at most every (timing)ms. Take the following event throttling, where each E is a call to this method and each character represents 20ms:
   *
   * E_E_E_E_E_E_E_E_E
   *
   * If timing is configured to 100ms, which is the default, the emission will occur as follows:
   *
   * ____E____E____E______E
   *
   * @param configuration.emitOnStart - Emits an event on the first call to throttle when no pending throttle is stored. **If emitOnStart is true and an only call to throttle is made, it will emit an only event.**
   */

  protected throttleData = {} as ThrottlingMap<Events>;
  protected throttleEmittedOnInit = {} as ThrottlingMarkers<Events>;
  throttle<K extends keyof Events>(
    event: K,
    data: Events[K],
    configuration?: ThrottleOptions,
  ) {
    if (!this.throttleEmittedOnInit[event] && configuration?.emitOnStart) {
      this.throttleEmittedOnInit[event] = true;
      setTimeout(() => {
        this.throttleEmittedOnInit[event] = false;
      }, configuration?.timing ?? this.defaultTiming);
      this.emit(event, data);
    } else if (!configuration?.emitOnStart) {
      if (
        this.throttleData[event] === NullObject ||
        !(event in this.throttleData)
      ) {
        setTimeout(() => {
          this.emit(event, this.throttleData[event] as Events[K]);
          this.throttleData[event] = NullObject;
        }, configuration?.timing ?? this.defaultTiming);
      }
      this.throttleData[event] = data;
    }
  }

  /**
   * This method is a mix between setState and debounce
   */
  setStateDebounced<K extends keyof Events>(
    event: K,
    data: SetStateAction<Events[K]>,
    configuration?: DebounceOptions,
  ): void {
    const actualData = isSetter(data) ? data(this.getState(event)) : data;

    this.debounce(event, actualData, configuration);
  }

  /**
   * This method is a mix between setState and throttle
   */
  setStateThrottled<K extends keyof Events>(
    event: K,
    data: SetStateAction<Events[K]>,
    configuration?: ThrottleOptions,
  ): void {
    const actualData = isSetter(data) ? data(this.getState(event)) : data;

    this.throttle(event, actualData, configuration);
  }
}
