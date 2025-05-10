import { FC } from "react";
import { ValidatedCollectorField } from "../common/ValidatedCollectorField";

export type Option = { label: string; value: string };

export class CollectorSelect extends ValidatedCollectorField<
  string,
  { options: Option[] }
> {
  protected selectRef: HTMLSelectElement | null = null;

  public focus(): void {
    this.selectRef!.focus();
  }

  public getValue(): string {
    return this.selectRef!.value;
  }

  public ControlComponent: FC = () => {
    return (
      <select
        defaultValue={this.properties.defaultValue}
        ref={(el) => {
          this.selectRef = el;
        }}
      >
        {this.state.useState("fieldProperties").options.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
    );
  };
}
