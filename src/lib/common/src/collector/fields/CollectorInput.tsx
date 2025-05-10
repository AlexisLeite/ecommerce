import { FC } from "react";
import { ValidatedCollectorField } from "../common/ValidatedCollectorField";

export class CollectorInput extends ValidatedCollectorField<string> {
  protected inputRef: HTMLInputElement | null = null;

  public focus(): void {
    this.inputRef!.focus();
  }

  public getValue(): string {
    return this.inputRef!.value;
  }

  public ControlComponent: FC = () => {
    return (
      <input
        defaultValue={this.properties.defaultValue}
        ref={(el) => {
          this.inputRef = el;
        }}
      />
    );
  };
}
