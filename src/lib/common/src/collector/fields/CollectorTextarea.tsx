import { FC } from "react";
import { ValidatedCollectorField } from "../common/ValidatedCollectorField";

export class CollectorTextarea extends ValidatedCollectorField<string> {
  protected textareaRef: HTMLTextAreaElement | null = null;

  public focus(): void {
    this.textareaRef!.focus();
  }

  public getValue(): string {
    return this.textareaRef!.value;
  }

  public ControlComponent: FC = () => {
    return (
      <textarea
        defaultValue={this.properties.defaultValue}
        ref={(el) => {
          this.textareaRef = el;
        }}
      />
    );
  };
}
