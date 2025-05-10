import { WithChildren } from "./types";

export type StackProps = {
  className?: string;
  direction?: "vertical" | "horizontal";
  size?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Stack: WithChildren<StackProps> = ({
  children,
  className,
  direction,
  size,
}) => {
  return (
    <div
      className={`stack stack--size-${size || 3} stack--direction-${direction || "vertical"} ${className || ""}`}
    >
      {children}
    </div>
  );
};
