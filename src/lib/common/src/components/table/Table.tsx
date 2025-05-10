import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import "./table.scss";

export type TableProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  variant?: "primary" | "secondary" | "unStyled";
};

export const Table: FC<TableProps> = ({ variant, ...props }) => {
  return (
    <table
      {...props}
      className={`table ${props.className || ""} table--${variant || "primary"}`}
    />
  );
};
