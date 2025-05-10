import { ChangeEvent, FC } from "react";
import { observer } from "mobx-react-lite";
import { ValidationField } from "./Field";
import { ValidatableField } from "./ValidatableField";
import { Input as IF, InputProps } from "../components/form/Input";

export const ValidationInput: FC<
  {
    field: ValidatableField<any>;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => string | void;
  } & Omit<InputProps, "value" | "defaultValue" | "onChange">
> = observer(({ field, className, onChange, ...props }) => (
  <ValidationField
    className={`field__input ${className || ""}`}
    text={field.title}
    required={field.isRequired}
    error={field.error}
  >
    <IF
      {...props}
      data-index={field.index}
      data-name={field.name}
      value={field.storeValue}
      onChange={(ev) => {
        const newValue = onChange?.(ev);

        if (!ev.defaultPrevented) {
          field.setValue(newValue ?? ev.target.value);
        }
      }}
    />
  </ValidationField>
));
