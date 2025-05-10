import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export type THeadProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const THead: FC<THeadProps> = (props) => {
  return (
    <thead {...props} className={`table__thead ${props.className || ""}`} />
  );
};
