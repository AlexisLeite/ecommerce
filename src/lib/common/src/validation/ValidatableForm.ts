import { makeObservable, observable, toJS } from "mobx";
import { ValidatableField } from "../validation/ValidatableField";
import { ValidatableGroup } from "../validation/ValidatableGroup";
import { ArrayValidatableField } from "./ArrayValidatableField";

export type ValidatableFormState<T extends Record<string, any>> = {
  [K in keyof T]: ValidatableGroup | ValidatableField<T[K], any>;
};

export class ValidatableForm<
  T extends Record<string, any> = Record<string, any>,
> {
  constructor(protected state: ValidatableFormState<T>) {
    makeObservable<this, "state">(this, { state: observable });
  }

  reset() {
    for (const f of Object.values(this.state)) {
      (f as ValidatableField<any>).reset();
    }
  }

  getArrayField<U extends any[] = any[], K extends keyof T = keyof T>(name: K) {
    return this.state[name] as ArrayValidatableField<T[K], U>;
  }

  getField<U = any, K extends keyof T = keyof T>(name: K) {
    return this.state[name] as ValidatableField<T[K], U>;
  }

  getGroup<K extends keyof T>(name: K) {
    return this.state[name] as ValidatableGroup;
  }

  getMappedObject(): T {
    const parseMap = (map: {
      [K: string]: ValidatableGroup | ValidatableField<any, any>;
    }): T =>
      Object.fromEntries(
        Object.entries(map).map(
          ([name, field]: [
            string,
            ValidatableGroup | ValidatableField<any>,
          ]) => [
            name,
            field instanceof ValidatableGroup
              ? field.rows.map((c) => parseMap(c))
              : toJS(field.submitValue),
          ],
        ),
      ) as T;

    return parseMap(this.state);
  }

  update(value: T) {
    this.reset();

    Object.entries(value).forEach(([name, value]) => {
      const current = this.state[name];
      current?.update(value);
    });
  }

  async validate() {
    let result = true;
    let firstInvalid: null | ValidatableField<any> = null;

    for await (const f of Object.values(this.state)) {
      const field = f as ValidatableField<any>;
      field.setForm(this);

      result = (await field.validate()) && result;
      if (!result && !firstInvalid) {
        firstInvalid = f;
      }
    }

    if (firstInvalid) {
      document
        .querySelector<HTMLElement>(`[data-name="${firstInvalid.name}"]`)
        ?.focus();
    }

    return result;
  }
}
