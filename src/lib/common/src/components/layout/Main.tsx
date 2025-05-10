import { WithChildren } from "./types";

export const Main: WithChildren = ({ children }) => (
  <main className={"main"}>{children}</main>
);
