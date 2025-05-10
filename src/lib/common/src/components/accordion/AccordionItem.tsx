import { observer } from "mobx-react-lite";
import { ReactNode, useMemo } from "react";
import { makeAutoObservable } from "mobx";

export type TAccordionVariant = "primary" | "secondary";

export type TAccordionItem = {
  children: ReactNode;
  defaultExpanded?: boolean;
  title: ReactNode;
  variant?: TAccordionVariant;
};

export class AccordionItemState {
  expanded = false;

  constructor(defaultExpanded: boolean = false) {
    this.expanded = defaultExpanded;
    makeAutoObservable(this);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}

export const AccordionItem = observer(
  ({ children, defaultExpanded, title, variant }: TAccordionItem) => {
    const state = useMemo(
      () => new AccordionItemState(defaultExpanded),
      [defaultExpanded],
    );

    return (
      <article className={`accordion__item ${variant || "primary"}`}>
        <div
          onClick={() => {
            state.toggle();
          }}
          className={"accordion__item_label"}
        >
          {title}
        </div>
        {state.expanded && (
          <div className={"accordion__item_content"}>{children}</div>
        )}
      </article>
    );
  },
);
