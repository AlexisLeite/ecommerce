import { WithChildren } from "../types";

export const TwoColumns: WithChildren<{ className?: string }> = ({
  children,
  className,
}) => <div className={`${className || ""} two_columns`}>{children}</div>;
