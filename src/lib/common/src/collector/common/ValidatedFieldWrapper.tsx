import { ReactNode } from "react";
import { ValidatedCollectorField } from "./ValidatedCollectorField";

export const ValidatedFieldWrapper = ({
  children,
  field,
}: {
  children: ReactNode;
  field: ValidatedCollectorField<any, any>;
}) => {
  const errorMessage = field.useProperties().errorMessage;

  return (
    <label
      onKeyDown={() =>
        field.setProperties((s: any) => ({ ...s, errorMessage: null }))
      }
      className={`collector__field ${errorMessage ? "with__error" : ""}`}
    >
      <span className="collector__field__label__wrapper">
        {field.properties.label}
        {field.properties.validationRules?.required && (
          <span className="required__mark">*</span>
        )}
        :
      </span>
      {children}
      {errorMessage && <div className="error__wrapper">{errorMessage}</div>}
    </label>
  );
};
