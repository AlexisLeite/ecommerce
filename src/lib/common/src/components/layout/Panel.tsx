import { ReactNode } from "react";
import "./Panel.scss";

export const Panel = ({
  children,
  className,
  label,
  size,
}: {
  className?: string;
  children: ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
}) => (
  <div className={`${className || ""} panel panel--size-${size || "md"}`}>
    <div className={"panel__label"}>{label}</div>
    <div className={"panel__content"}>{children}</div>
  </div>
);
