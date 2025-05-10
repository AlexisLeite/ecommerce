import { makeObservable, observable } from "mobx";
import { ValidatableField } from "../validation/ValidatableField";

export type ValidatableGroupDefinition<T extends Record<string, any>> = {
  [K in keyof T]: ValidatableField<T[K], any>;
};

export class ValidatableGroup<
  T extends Record<string, any> = Record<string, any>,
> {
  rows: ValidatableGroupDefinition<T>[] = [];

  constructor(private definition: ValidatableGroupDefinition<T>) {
    makeObservable(this, { rows: observable });
  }

  addRow() {
    this.rows.push(
      Object.fromEntries(
        Object.entries(this.definition).map(([name, field]) => [
          name,
          field.clone(),
        ]),
      ) as ValidatableGroupDefinition<T>,
    );

    const index = this.rows.length - 1;

    Object.values(this.rows[index]).forEach((c) => c.setIndex(index));

    return this.rows[index];
  }

  update(v: T[]) {
    this.reset();
    v.forEach((c, i) => {
      this.addRow();
      Object.entries(c).forEach(([fieldName, state]) => {
        const o = this.rows[i][fieldName];
        o.update(state);
      });
    });
  }

  getField<K extends keyof T>(index: number, name: K) {
    return this.rows[index][name] as ValidatableField<T[K], any>;
  }

  removeRow(i: number) {
    this.rows.splice(i, 1);

    for (; i < this.rows.length; i++) {
      Object.values(this.rows[i]).forEach((c) => c.setIndex(i));
    }
  }

  reset() {
    this.rows.splice(0);
  }

  async validate() {
    let firstInvalid: null | ValidatableField<any> = null;
    let result = true;

    for await (const row of this.rows) {
      for await (const f of Object.values(row)) {
        result = (await (f as ValidatableField<any>).validate()) && result;
        if (!result && !firstInvalid) {
          firstInvalid = f;
        }
      }
    }

    if (firstInvalid) {
      document
        .querySelector<HTMLElement>(
          `[data-index="${firstInvalid.index}"][data-name="${firstInvalid.name}"]`,
        )
        ?.focus();
    }

    return result;
  }
}
