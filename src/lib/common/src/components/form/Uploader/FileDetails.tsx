import { observer } from "mobx-react-lite";
import { FaTrash } from "@meronex/icons/all";
import { HStack } from "../../layout/HStack";
import { Stack } from "../../layout/Stack";
import { ErrorMessage } from "../ErrorMessage";
import { IconButton } from "../IconButton";

export type TUploadDetails = {
  error?: string;
  progress?: number;
  name: string;
  onRemove: () => unknown;
};

export const ProgressBar = (_: { value: number; max: number }) => (
  <>Not implemented: PROGRESS BAR</>
);

export const FileDetails = observer(
  ({ error, onRemove, name, progress }: TUploadDetails) => {
    return (
      <HStack className={"upload_details"}>
        <Stack className={"upload_label_and_progress"}>
          {name}
          <ErrorMessage>{error}</ErrorMessage>
          {progress !== undefined && <ProgressBar value={progress} max={100} />}
        </Stack>
        <IconButton className={"erase_upload"} onClick={() => onRemove()}>
          <FaTrash />
        </IconButton>
      </HStack>
    );
  },
);
