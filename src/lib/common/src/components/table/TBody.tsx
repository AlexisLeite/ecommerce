import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export type TBodyProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TBody: FC<TBodyProps> = (props) => {
  return (
    <tbody {...props} className={`table__tbody ${props.className || ""}`} />
  );
};
