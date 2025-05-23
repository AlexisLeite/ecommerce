import { DetailedHTMLProps, FC, TdHTMLAttributes } from "react";

export type CellProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const Cell: FC<CellProps> = (props) => {
  return <td {...props} className={`table__cell ${props.className || ""}`} />;
};
