"use client";

import { downloadBackup, uploadBackup } from "@/src/store/server/BackupServer";
import { parseServerResponse } from "@/src/store/server/processServerResponse";
import { Button, downloadJson, readJsonFile } from "common";

export default function Batch() {
  return (
    <>
      <Button
        onClick={async () => {
          downloadJson("backup.json", await downloadBackup());
        }}
      >
        Descargar backup
      </Button>
      <Button
        onClick={async () => {
          readJsonFile().then((json) =>
            parseServerResponse(uploadBackup(json)),
          );
        }}
      >
        Subir backup
      </Button>
    </>
  );
}
