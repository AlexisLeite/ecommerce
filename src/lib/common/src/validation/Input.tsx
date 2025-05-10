import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";
import { Field } from "./Field";
import { ValidatableField } from "./ValidatableField";
import { Input as IF } from "../components/form/Input";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: FC<
  {
    field: ValidatableField<any>;
    onChange?: (ev: ChangeEvent<HTMLInputElement>) => string | void;
  } & Omit<InputProps, "value" | "defaultValue" | "onChange">
> = observer(({ field, className, onChange, ...props }) => (
  <Field
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
  </Field>
));
