import { action, makeObservable, observable, runInAction } from "mobx";
import { ValidatableForm } from "../validation/ValidatableForm";

export type FieldState<T, U> = {
  error?: string;
  index?: number;
  name: string;
  required?: boolean;
  title: string;
  validation?: (form: ValidatableForm, value: T) => Promise<string | true>;
  submitValue: T;
  storeValue: U;
  touched?: boolean;
  storeToSubmitValueMapping?: (v: U) => T;
  submitToStoreValueMapping?: (v: T) => U;
};

export class ValidatableField<
  SubmitValueType,
  StoreValueType = SubmitValueType,
> {
  private readonly initialValue: StoreValueType;
  private state: FieldState<SubmitValueType, StoreValueType>;
  private form: ValidatableForm = {} as any;

  constructor({
    storeToSubmitValueMapping,
    submitToStoreValueMapping,
    value,
    ...initialState
  }: Pick<
    FieldState<SubmitValueType, StoreValueType>,
    "validation" | "required" | "name" | "title"
  > & {
    storeToSubmitValueMapping?: (v: StoreValueType) => SubmitValueType;
    submitToStoreValueMapping?: (v: SubmitValueType) => StoreValueType;
    value: StoreValueType;
  }) {
    this.state = {
      ...initialState,
      submitValue: storeToSubmitValueMapping
        ? storeToSubmitValueMapping(value)
        : (value as unknown as SubmitValueType),
      storeToSubmitValueMapping: storeToSubmitValueMapping,
      submitToStoreValueMapping: submitToStoreValueMapping,
      storeValue: value,
      touched: false,
    };
    this.initialValue = this.state.storeValue;
    makeObservable<this, "state">(this, {
      state: observable,
      setValue: action,
      validate: action,
      reset: action,
    });
  }

  get isTouched() {
    return this.state.touched;
  }

  get isRequired() {
    return this.state.required;
  }

  get error() {
    return this.state.error;
  }

  get mappedValue() {
    return this.state.storeValue;
  }

  get name() {
    return this.state.name;
  }

  get title() {
    return this.state.title;
  }

  get submitValue(): SubmitValueType {
    return this.state.storeToSubmitValueMapping
      ? this.state.storeToSubmitValueMapping(this.state.storeValue)
      : (this.state.storeValue as unknown as SubmitValueType);
  }

  get storeValue(): StoreValueType {
    return this.state.storeValue;
  }

  get index() {
    return this.state.index;
  }

  update(value: SubmitValueType) {
    this.reset();

    this.state.storeValue =
      this.state.submitToStoreValueMapping?.(value) ?? (value as any);
  }

  setIndex(i: number) {
    this.state.index = i;
  }

  clone() {
    return new ValidatableField({
      storeToSubmitValueMapping: this.state.storeToSubmitValueMapping,
      value: this.state.storeValue,
      ...this.state,
    });
  }

  setForm(f: ValidatableForm) {
    this.form = f;
  }

  setValue(v: StoreValueType) {
    this.state.storeValue = v;

    this.state.touched = true;
    this.validate();
  }

  reset() {
    this.setValue(this.initialValue);

    setTimeout(() => {
      delete this.state.error;
      delete this.state.touched;
    }, 0);
  }

  async validate() {
    if (this.state.required && !this.submitValue) {
      this.state.error = "required";
      return false;
    }

    const result = await this.state.validation?.(this.form, this.submitValue);

    runInAction(() => {
      if (typeof result === "string") {
        this.state.error = result;
        return;
      }

      delete this.state.error;
    });

    return true;
  }
}
