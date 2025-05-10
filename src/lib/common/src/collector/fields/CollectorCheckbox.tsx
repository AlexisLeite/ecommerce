import { FC } from "react";
import { ValidatedCollectorField } from "../common/ValidatedCollectorField";

export class CollectorCheckbox extends ValidatedCollectorField<boolean> {
  protected checkRef: HTMLInputElement | null = null;

  public focus(): void {
    this.checkRef!.focus();
  }

  public getValue(): boolean {
    return this.checkRef!.checked;
  }

  public ControlComponent: FC = () => {
    return (
      <input
        type="checkbox"
        defaultChecked={this.properties.defaultValue}
        ref={(el) => {
          this.checkRef = el;
        }}
      />
    );
  };
}
