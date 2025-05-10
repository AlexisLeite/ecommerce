import { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";
import { ValidatableField } from "../validation/ValidatableField";
import { Field } from "../validation/Field";
import { Select as SF } from "../components/form/Select";

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: FC<
  {
    field: ValidatableField<any>;
  } & Omit<SelectProps, "value" | "defaultValue">
> = observer(({ field, className, onChange, ...props }) => (
  <Field
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
  </Field>
));
