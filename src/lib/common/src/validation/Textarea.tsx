import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  TextareaHTMLAttributes,
} from "react";
import { observer } from "mobx-react-lite";
import { ValidatableField } from "../validation/ValidatableField";
import { Field } from "../validation/Field";
import { Textarea as TF } from "../components/form/Textarea";

export type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea: FC<
  {
    field: ValidatableField<any>;
    onChange?: (ev: ChangeEvent<HTMLTextAreaElement>) => string | void;
  } & Omit<TextareaProps, "value" | "defaultValue" | "onChange">
> = observer(({ field, className, onChange, ...props }) => (
  <Field
    className={`field__textarea ${className || ""}`}
    text={field.title}
    required={field.isRequired}
    error={field.error}
  >
    <TF
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
