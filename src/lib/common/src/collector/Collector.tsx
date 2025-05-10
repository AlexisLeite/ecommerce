import { BaseModal } from "../components/modals/BaseModal";
import { Confirm } from "../components/modals/dialogs/Confirm";
import { ModalsController } from "../components/modals/ModalsController";
import { EventEmitter } from "../EventEmitter";
import { CollectorField } from "./common/CollectorField";
import { ValidatedCollectorField } from "./common/ValidatedCollectorField";

export type CollectorShowProps = Omit<BaseModal, "children">;

export class Collector {
  constructor() {}

  protected fields: CollectorField<any>[] = [];
  protected emitter = new EventEmitter<{ confirm: any; cancel: any }>();
  protected RenderComponents = () => {
    return (
      <>
        {this.fields.map((c) => (
          <c.Component key={c.id} />
        ))}
      </>
    );
  };
  protected validate() {
    let hasError = false;

    for (const field of this.fields) {
      if (field instanceof ValidatedCollectorField && !field.validate()) {
        if (!hasError) field.focus();
        hasError = true;
      }
    }

    if (hasError) return false;

    this.emitter.emit(
      "confirm",
      this.fields
        .filter(
          (c): c is ValidatedCollectorField<any> =>
            c instanceof ValidatedCollectorField,
        )
        .reduce<
          Record<string, any>
        >((res, field) => ({ ...res, [field.properties.name]: field.getValue() }), {}),
    );
  }
  protected Render = () => {
    return (
      <div className="collector__fields">
        <this.RenderComponents />
      </div>
    );
  };

  add = this.fields.push.bind(this.fields);

  public show<T>(props?: CollectorShowProps): Promise<T | null> {
    const modal = new Confirm({
      ...props,
      content: <this.Render />,
      onCancel: () => {
        this.emitter.emit("cancel", null);
      },
      onConfirm: () => {
        this.validate();
      },
      title: "",
    });
    const close = ModalsController.instance.append(modal);

    return new Promise<T | null>((resolve) => {
      const uns1 = this.emitter.on("cancel", () => {
        close();
        resolve(null);
        uns1();
        uns2();
      });
      const uns2 = this.emitter.on("confirm", (res) => {
        close();
        resolve(res);
        uns1();
        uns2();
      });
    });
  }
}
