import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import "./table.scss";
import { CellProps } from "./Cell";

export type HeaderCell = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const HeaderCell: FC<CellProps> = (props) => {
  return (
    <th {...props} className={`table__header_cell ${props.className || ""}`} />
  );
};
