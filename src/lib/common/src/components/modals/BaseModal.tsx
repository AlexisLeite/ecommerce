import { createContext, ReactNode, useContext } from "react";
import "./BaseModal.scss";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { FocusTrap } from "focus-trap-react";
import { RiCloseFill } from "@meronex/icons/all";
import { observer } from "mobx-react-lite";
import { IconButton } from "../form/IconButton";
import { ModalsController } from "./ModalsController";

export type TModalSize = "sm" | "md" | "lg" | "xl";

export type TModalContext = {
  close: () => void;
};

const ModalContext = createContext<TModalContext | null>(null);

export function useModalContext() {
  return useContext(ModalContext)!;
}

export abstract class BaseModal {
  public Component = observer(({ close }: { close: () => void }) => {
    const { t } = useTranslation();
    const footer = this.getModalFooter(close, t);

    return (
      <div
        onClick={() => {
          if (this.getBehavior().closeOnOverlayClick) {
            close();
          }
        }}
        className={"modal_wrapper"}
        ref={(el) => {
          if (el) {
            el.scrollTop = el.scrollHeight;
            this.getFocusElement(el)?.focus?.();
          }
        }}
      >
        <FocusTrap>
          <ModalContext.Provider value={{ close }}>
            <div
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              className={`modal_container size-${this.getModalSize()}`}
            >
              <div className={"modal_header"}>
                {this.getModalTitle(t)}
                <IconButton
                  size={"sm"}
                  variant={"outline-danger"}
                  className={"modal_close"}
                  onClick={close}
                >
                  <RiCloseFill />
                </IconButton>
              </div>
              <div className={"modal_body"}>{this.getModalContent(t)}</div>
              {footer && <div className={"modal_footer"}>{footer}</div>}
            </div>
          </ModalContext.Provider>
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
