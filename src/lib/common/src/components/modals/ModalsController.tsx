import { observer } from "mobx-react-lite";
import { FC, Fragment } from "react";
import { makeObservable, observable } from "mobx";
import { ModalContext } from "./BaseModal";

export interface IModal {
  close: () => unknown;
  Component: FC<{ close: () => void }>;
  onClose(): Promise<boolean>;
}

export class ModalsController {
  public static Provider = observer(() => {
    return (
      <div className="modals__container">
        {[...this.instance.modals.entries()].map(([key, Node]) => (
          <Fragment key={key}>
            <ModalContext.Provider value={{ close: () => Node.close() }}>
              <Node.Component
                close={this.instance.close.bind(this.instance, key)}
              />
            </ModalContext.Provider>
          </Fragment>
        ))}
      </div>
    );
  });

  public static instance: ModalsController = new ModalsController();
  private modals: Map<number, IModal> = new Map();
  private id = 0;

  private constructor() {
    makeObservable<ModalsController, "modals">(this, {
      modals: observable,
    });

    typeof document !== "undefined" &&
      document?.addEventListener("keydown", (ev) => {
        if (ev.code === "Escape") {
          [...this.modals.values()].at(-1)?.close();
        }
      });
  }

  append(node: IModal) {
    const key = this.id++;
    this.id = this.id % 999999; // How many modals?

    this.modals.set(key, node);

    return this.close.bind(this, key);
  }

  private close(id: any) {
    this.modals
      .get(id)
      ?.onClose()
      .then((canClose) => {
        if (canClose) {
          this.modals.delete(id);
        }
      });
  }
}
