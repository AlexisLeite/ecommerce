import { List } from "common";
import { ReactNode } from "react";

export const VerticalNavigation = ({ children }: { children: ReactNode }) => {
  return <List className="vertical_navigation">{children}</List>;
};
