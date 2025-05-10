import { FC } from "react";
import { observer } from "mobx-react-lite";
import { ValidatableField } from "../validation/ValidatableField";
import { ValidationField } from "../validation/Field";
import { SelectProps, Select as SF } from "../components/form/Select";

export const ValidationSelect: FC<
  {
    field: ValidatableField<any>;
  } & Omit<SelectProps, "value" | "defaultValue">
> = observer(({ field, className, onChange, ...props }) => (
  <ValidationField
    className={`field__select ${className || ""}`}
    text={field.title}
    required={field.isRequired}
    error={field.error}
  >
    <SF
      {...props}
      data-index={field.index}
      data-name={field.name}
      value={field.storeValue}
      onChange={(ev) => {
        onChange?.(ev);

        if (!ev.defaultPrevented) {
          field.setValue(ev.target.value);
        }
      }}
    />
  </ValidationField>
));
