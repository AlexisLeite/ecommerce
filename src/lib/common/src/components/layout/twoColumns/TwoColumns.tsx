import { WithChildren } from "../types";
import "./TwoColumns.scss";

export const TwoColumns: WithChildren = ({ children }) => (
  <div className={"two_columns"}>{children}</div>
);
