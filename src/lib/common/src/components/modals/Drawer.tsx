import { FC, ReactNode, useState } from "react";
import { IModal } from "./ModalsController";
import { HStack, Stack } from "../layout";
import { IconButton } from "../form";
import { MdClose } from "@meronex/icons/ios";

export type TDrawer = {
  content: ReactNode;
  title: string;
  onClose?: () => unknown;
};

export class Drawer implements IModal {
  private static _drawers = 0;

  private static get drawers() {
    return this._drawers;
  }

  private static set drawers(v: number) {
    this._drawers = v;
    if (this._drawers > 0) {
      document.body.classList.add("drawer_open");
    } else {
      document.body.classList.remove("drawer_open");
    }
  }

  constructor(protected props: TDrawer) {
    Drawer.drawers++;
  }

  close = () => {};

  Component: FC<{ close: () => void }> = ({ close }) => {
    const [closing, setClosing] = useState(false);

    this.close = () => {
      Drawer.drawers--;
      setClosing(true);
      setTimeout(() => close(), 150);
      this.props.onClose?.();
    };

    return (
      <Stack
        className={`drawer__wrapper ${closing ? "is_closing" : "is_open"}`}
      >
        <HStack className="drawer__header">
          <strong>{this.props.title}</strong>
          <IconButton
            onClick={() => {
              this.close!();
            }}
          >
            <MdClose />
          </IconButton>
        </HStack>
        <div className="drawer__content">{this.props.content}</div>
      </Stack>
    );
  };

  onClose(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
