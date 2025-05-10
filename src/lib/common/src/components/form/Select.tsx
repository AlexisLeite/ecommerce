import { DetailedHTMLProps, FC, SelectHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: FC<SelectProps> = observer((props) => (
  <select {...props} className={`select ${props.className || ""}`} />
));
