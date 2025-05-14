import { ValidatableField } from "./ValidatableField";

export class ArrayValidatableField<
  SubmitValueType extends any[],
  StoreValueType extends any[] = SubmitValueType,
> extends ValidatableField<SubmitValueType, StoreValueType> {
  filter(cb: (c: StoreValueType[0]) => boolean) {
    this.state.storeValue = this.state.storeValue.filter(cb) as StoreValueType;
  }

  removeValue(c: StoreValueType[0]) {
    this.state.storeValue = this.state.storeValue.filter(
      (s) => s !== c,
    ) as StoreValueType;
  }
}
