import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { FileDetails } from "./FileDetails";
import { Upload } from "./UploadHandler";

export const UploadDetails = observer(({ upload }: { upload: Upload }) => {
  const { t } = useTranslation();

  return (
    <FileDetails
      onRemove={() => upload.remove()}
      name={upload.state.fileName}
      error={upload.state.status === "error" ? t("uploadError") : undefined}
      progress={
        upload.state.status === "uploading" ? upload.state.progress : undefined
      }
    />
  );
});
