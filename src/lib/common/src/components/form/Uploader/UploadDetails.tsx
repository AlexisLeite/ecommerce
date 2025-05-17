import { observer } from "mobx-react-lite";
import { FileDetails } from "./FileDetails";
import { Upload } from "./UploadHandler";

export const UploadDetails = observer(({ upload }: { upload: Upload }) => {
  return (
    <FileDetails
      onRemove={() => upload.remove()}
      name={upload.state.fileName}
      error={String(upload.state.error || "")}
      progress={
        upload.state.status === "uploading" ? upload.state.progress : undefined
      }
    />
  );
});
