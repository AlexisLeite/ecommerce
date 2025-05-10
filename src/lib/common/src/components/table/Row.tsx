import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export type RowProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const Row: FC<RowProps> = (props) => {
  return <tr {...props} className={`table__row ${props.className || ""}`} />;
};
