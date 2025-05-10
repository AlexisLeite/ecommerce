import { FC } from "react";
import { StatefulEmitter } from "../../EventEmitter/StatefulEmitter";

let maxId = 0;

export abstract class CollectorField<Properties> {
  protected _id = maxId++;
  get id() {
    return this._id;
  }

  protected state: StatefulEmitter<{
    fieldProperties: Properties;
  }>;
  constructor(fieldProperties?: Properties) {
    this.state = new StatefulEmitter<{
      fieldProperties: Properties;
    }>({ fieldProperties });
  }

  public setProps(newProps: Partial<Properties>) {
    this.state.setState("fieldProperties", (c) => ({ ...c, ...newProps }));
  }
  public useProps() {
    return this.state.useState("fieldProperties");
  }

  public abstract Component: FC;
}
