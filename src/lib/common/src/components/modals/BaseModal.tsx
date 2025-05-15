import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FocusTrap } from "focus-trap-react";
import { observer } from "mobx-react-lite";
import { IconButton } from "../form/IconButton";
import { IModal, ModalsController } from "./ModalsController";
import { VscClose } from "@meronex/icons/vsc";

export type TModalSize = "sm" | "md" | "lg" | "xl";

export type TModalContext = {
  close: () => void;
};

export const ModalContext = createContext<TModalContext | null>(null);

export function useModalContext() {
  return useContext(ModalContext)!;
}

export abstract class BaseModal implements IModal {
  close = () => {};

  public Component = observer(({ close }: { close: () => void }) => {
    const [closing, setClosing] = useState(false);
    const { t } = useTranslation();
    const footer = this.getModalFooter(close, t);

    this.close = () => {
      setClosing(true);
      setTimeout(() => close(), 150);
    };

    const didFocus = useRef(false);

    return (
      <div
        onClickCapture={(ev) => {
          if (
            this.getBehavior().closeOnOverlayClick &&
            !(ev.target as HTMLElement).closest?.(".modal_container")
          ) {
            this.close();
          }
        }}
        className={`modal_wrapper ${closing ? "is_closing" : "is_open"}`}
        ref={(el) => {
          if (el && !didFocus.current) {
            didFocus.current = true;
            el.scrollTop = el.scrollHeight;
            this.getFocusElement(el)?.focus?.();
          }
        }}
      >
        <FocusTrap>
          <div className={`modal_container size-${this.getModalSize()}`}>
            <div className={"modal_header"}>
              {this.getModalTitle(t)}
              <IconButton
                size={"sm"}
                variant={"outline-danger"}
                className={"modal_close"}
                onClick={this.close}
              >
                <VscClose />
              </IconButton>
            </div>
            <div className={"modal_body"}>{this.getModalContent(t)}</div>
            {footer && <div className={"modal_footer"}>{footer}</div>}
          </div>
        </FocusTrap>
      </div>
    );
  });

  onClose(): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected internalShowModal() {
    const close = ModalsController.instance.append(this);

    return close;
  }

  protected getBehavior() {
    return {
      closeOnOverlayClick: true,
    };
  }

  protected getModalSize(): TModalSize {
    return "md";
  }

  protected getFocusElement(ref: HTMLElement): HTMLElement | null {
    return ref.querySelector<HTMLElement>("button,input,select,textarea");
  }

  protected abstract getModalContent(
    t: TFunction<"translation", undefined>,
  ): ReactNode;

  protected getModalFooter(
    _close: () => void,
    _t: TFunction<"translation", undefined>,
  ): ReactNode {
    return null;
  }

  protected abstract getModalTitle(
    t: TFunction<"translation", undefined>,
  ): string;
}
