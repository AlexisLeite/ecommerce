import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useTranslation } from "react-i18next";
import { UploadHandler } from "./UploadHandler";
import { Stack } from "../../layout/Stack";
import { UploadDetails } from "./UploadDetails";

export type UploadedFile = {
  filename: string;
};

export const Uploader = observer(
  ({
    name,
    onUploaded,
  }: {
    name?: string;
    onUploaded: (file: UploadedFile) => unknown;
  }) => {
    const handler = useMemo(() => {
      const uploader = new UploadHandler();
      uploader.on("success", (which) => {
        onUploaded(toJS(which.state.file!));
      });
      return uploader;
    }, [onUploaded]);

    const { t } = useTranslation();

    return (
      <Stack className={"uploader"}>
        <input
          data-name={name}
          type={"file"}
          onChange={async (ev) => {
            handler.upload(ev.target.files!);
            ev.target.value = "";
          }}
          multiple
        />
        {handler.state.uploads.length > 0 && (
          <>
            <h4>{t("inProgressFiles")}</h4>
            <Stack className={"upload_list"}>
              {handler.state.uploads.map((c) => (
                <UploadDetails upload={c} key={c.state.id} />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    );
  },
);
