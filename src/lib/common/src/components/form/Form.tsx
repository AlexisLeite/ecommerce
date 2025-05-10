import "./Form.scss";
import { DetailedHTMLProps, FC } from "react";

export type FormProps = DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export const Form: FC<FormProps> = (props) => (
  <form {...props} className={`form ${props.className || ""}`} />
);
