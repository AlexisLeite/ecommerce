import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { makeObservable, observable } from "mobx";
import { BaseModal } from "./BaseModal";

export class ModalsController {
  public static Provider = observer(() => {
    return (
      <div
        className="modals__container"
        onKeyDown={(ev) => {
          if (ev.code === "Escape") {
            this.instance.close([...this.instance.modals.keys()].at(-1));
          }
        }}
      >
        {[...this.instance.modals.entries()].map(([key, Node]) => (
          <Fragment key={key}>
            <Node.Component
              close={this.instance.close.bind(this.instance, key)}
            />
          </Fragment>
        ))}
      </div>
    );
  });

  public static instance: ModalsController = new ModalsController();
  private modals: Map<number, BaseModal> = new Map();
  private id = 0;

  private constructor() {
    makeObservable<ModalsController, "modals">(this, {
      modals: observable,
    });
  }

  append(node: BaseModal) {
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
