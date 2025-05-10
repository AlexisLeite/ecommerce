import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { observer } from "mobx-react-lite";

export type TextareaProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea: FC<TextareaProps> = observer((props) => (
  <textarea {...props} className={`textarea ${props.className || ""}`} />
));
