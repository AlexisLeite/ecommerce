"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import '../../styles/theme/ui/button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "",
  className = "",
  ...props
}) => {
  return (
    <button {...props} className={`${className} ${variant}`}>
      {children}
    </button>
  );
};
