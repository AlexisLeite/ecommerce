import { FC, ReactNode, createElement, useMemo } from "react";
import { CollectorField } from "../common/CollectorField";

export class CollectorLabel extends CollectorField<{
  children: ReactNode;
  kind: "h1" | "h2" | "h3" | "strong" | "p";
}> {
  public Component: FC = () => {
    const props = this.useProps();

    const newComponent = useMemo(() => {
      return createElement(props.kind, { children: props.children });
    }, [props.children, props.kind]);

    return newComponent;
  };
}
