import { FC } from "react";
import { ButtonProps } from "./Button";

export type IconButtonProps = Omit<ButtonProps, "variant"> & {
  variant?: "primary" | "secondary" | "ghost" | "outline-danger" | "warning";
};

export const IconButton: FC<IconButtonProps> = ({
  size,
  className,
  variant,
  ...props
}) => (
  <button
    {...props}
    type={props.type || "button"}
    className={`icon_button ${className || ""} button--size-${size || "md"} button--variant-${variant || "secondary"}`}
  />
);
