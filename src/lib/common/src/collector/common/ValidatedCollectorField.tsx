import { FC, SetStateAction } from "react";
import { StatefulEmitter } from "../../EventEmitter/StatefulEmitter";
import { CollectorField } from "./CollectorField";
import { ValidatedFieldWrapper } from "./ValidatedFieldWrapper";

export type ValidationRules = {
  required?: boolean;
  /**
   * Defaults to 'This field is required'
   */
  requiredMessage?: string;
};

export type ValidatedFieldProperties<DataType> = {
  defaultValue?: DataType;
  errorMessage?: string;
  label: string;
  name: string;
  validationRules?: ValidationRules;
};

export abstract class ValidatedCollectorField<
  DataType = any,
  ExtraProperties = object,
> extends CollectorField<ValidatedFieldProperties<DataType> & ExtraProperties> {
  protected state: StatefulEmitter<{
    fieldProperties: ValidatedFieldProperties<DataType> & ExtraProperties;
  }>;

  constructor(
    fieldProperties?: ValidatedFieldProperties<DataType> & ExtraProperties,
  ) {
    super(fieldProperties);

    this.state = new StatefulEmitter<{
      fieldProperties: ValidatedFieldProperties<DataType> & ExtraProperties;
    }>({ fieldProperties });
  }

  public abstract focus(): void;
  public abstract getValue(): DataType;

  public get properties() {
    return this.state.getState("fieldProperties");
  }
  public setProperties(
    state: SetStateAction<ValidatedFieldProperties<DataType> & ExtraProperties>,
  ) {
    this.state.setState("fieldProperties", state);
  }
  public useProperties = () => {
    return this.state.useState("fieldProperties");
  };
  public validate(): boolean {
    if (this.properties.validationRules?.required && !this.getValue()) {
      this.state.setState("fieldProperties", (s) => ({
        ...s,
        errorMessage:
          this.properties.validationRules?.requiredMessage ??
          "This field is required",
      }));
      return false;
    }
    return true;
  }

  public Component = () => {
    return (
      <ValidatedFieldWrapper field={this}>
        <this.ControlComponent />
      </ValidatedFieldWrapper>
    );
  };

  public abstract ControlComponent: FC;
}
