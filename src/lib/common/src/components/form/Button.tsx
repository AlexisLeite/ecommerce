import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "link" | "ghost" | "outline";
};

export const Button: FC<ButtonProps> = ({
  size,
  className,
  variant,
  ...props
}) => (
  <button
    {...props}
    type={props.type || "button"}
    className={`button ${className || ""} button--size-${size || "md"} button--variant-${variant || "primary"}`}
  />
);
