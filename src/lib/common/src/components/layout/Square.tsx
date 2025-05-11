import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type SquareProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  size: number;
};

export const Square = ({ size, ...props }: SquareProps) => (
  <div
    {...props}
    style={{ ...props.style, height: `${size}px`, width: `${size}px` }}
  />
);
