import { FC, useMemo, useRef } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { UploadHandler } from "./UploadHandler";
import { Stack } from "../../layout/Stack";
import { UploadDetails } from "./UploadDetails";

export type UploadedFile = {
  id: number;
};

export const Uploader = observer(
  ({
    name,
    onError,
    onUploaded,
    endPoint,
    Render,
  }: {
    name?: string;
    onError?: (err: unknown) => unknown;
    onUploaded: (file: UploadedFile) => unknown;
    endPoint: string;
    Render?: FC<{ onClick: () => unknown }>;
  }) => {
    const handler = useMemo(() => {
      const uploader = new UploadHandler(endPoint);
      uploader.on("success", (which) => {
        onUploaded(toJS(which.state.file!));
      });
      uploader.on("error", (e) => onError?.(e));
      return uploader;
    }, [endPoint, onError, onUploaded]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <Stack className={"uploader"}>
        <input
          data-name={name}
          type={"file"}
          onChange={async (ev) => {
            handler.upload(ev.target.files!);
            ev.target.value = "";
          }}
          ref={inputRef}
          style={{ display: Render ? "none" : undefined }}
          multiple
        />
        {Render && (
          <Render
            onClick={() => {
              inputRef.current?.click();
            }}
          />
        )}
        {handler.state.uploads.length > 0 && (
          <>
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
