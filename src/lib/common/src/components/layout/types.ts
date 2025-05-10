import { FC, ReactNode } from "react";

type WithChildrenBase = { children?: ReactNode };

export type WithChildren<T = void> = FC<
  T extends Record<string, unknown> ? WithChildrenBase & T : WithChildrenBase
>;
