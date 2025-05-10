import { WithChildren } from "./types";

export const Aside: WithChildren = ({ children }) => (
  <aside className={"aside"}>{children}</aside>
);
