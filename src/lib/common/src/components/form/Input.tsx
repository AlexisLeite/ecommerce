import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: FC<InputProps> = observer((props) => (
  <input
    {...props}
    className={`input ${props.type === "checkbox" ? "checkbox" : ""} ${props.className || ""}`}
  />
));
