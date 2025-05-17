"use client";

import { BatchInstructionsModal } from "@/src/components/modals/BatchInstructionsModal";
import { downloadBackup, uploadBackup } from "@/src/store/server/BackupServer";
import { parseServerResponse } from "@/src/store/server/processServerResponse";
import {
  Button,
  downloadJson,
  List,
  ListItem,
  ModalsController,
  readJsonFile,
  Uploader,
} from "common";

export default function Batch() {
  return (
    <div className="admin_batch">
      <section>
        <h2>Respaldo de la base de datos</h2>
        <List>
          <ListItem>
            <Button
              onClick={async () => {
                downloadJson("backup.json", await downloadBackup());
              }}
              variant="link"
            >
              Descargar backup
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={async () => {
                readJsonFile().then((json) =>
                  parseServerResponse(uploadBackup(json)),
                );
              }}
              variant="link"
            >
              Subir backup
            </Button>
          </ListItem>
        </List>
      </section>
      <section>
        <h2>Carga en batch</h2>
        <List>
          <ListItem>
            <Button
              onClick={async () => {
                ModalsController.instance.append(new BatchInstructionsModal());
              }}
              variant="link"
            >
              Instrucciones
            </Button>
          </ListItem>
          <ListItem>
            <Uploader
              endPoint="/api/batch"
              onUploaded={(file) => {
                console.log(file);
              }}
              Render={({ onClick }) => (
                <Button onClick={onClick} variant="link">
                  Subir zip
                </Button>
              )}
            />
          </ListItem>
        </List>
      </section>
    </div>
  );
}
