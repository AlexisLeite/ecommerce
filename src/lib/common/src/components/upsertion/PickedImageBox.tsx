import { ReactNode } from "react";
import { IconButton } from "../form/IconButton";
import { VscClose } from "@meronex/icons/vsc";

export const PickedImageBox = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => unknown;
}) => {
  return (
    <div className="picked_image_box">
      {children}
      <IconButton
        size={"sm"}
        variant={"danger"}
        className={"remove_item"}
        onClick={onClose}
      >
        <VscClose />
      </IconButton>
    </div>
  );
};
