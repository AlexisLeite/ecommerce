import { IconButton } from "../form/IconButton";
import { VscClose } from "@meronex/icons/vsc";
export const PickedItemBox = ({
  label,
  onClose,
}: {
  label: string;
  onClose: () => unknown;
}) => {
  return (
    <div className="picked_item_box">
      <span>{label}</span>
      <IconButton
        size={"sm"}
        variant={"outline-danger"}
        className={"remove_item"}
        onClick={onClose}
      >
        <VscClose />
      </IconButton>
    </div>
  );
};
