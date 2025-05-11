import { makeObservable, observable } from "mobx";
import axios, { AxiosProgressEvent } from "axios";
import type { UploadedFile } from "./Uploader";
import { EventEmitter } from "../../../EventEmitter";

type TUploadState = {
  id: number;
  file?: UploadedFile;
  fileName: string;
  progress: number;
  status: "uploading" | "error" | "success";
};

export class Upload {
  private static id = 0;

  state: TUploadState = {
    fileName: "",
    id: Upload.id++,
    progress: 0,
    status: "uploading",
  };
  private emitter = new EventEmitter<{
    error: null;
    remove: null;
    success: null;
  }>();
  on = this.emitter.on.bind(this.emitter);

  constructor(
    private endPoint: string,
    private file: File,
  ) {
    makeObservable(this, { state: observable });
    void this.start();
  }

  remove() {
    this.emitter.emit("remove", null);
  }

  private async start() {
    const formData = new FormData();
    formData.append("file", this.file);
    this.state.fileName = this.file.name;

    try {
      const response = await axios.post(this.endPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            this.state.progress = Math.round((loaded * 100) / total);
          }
        },
      });
      this.state.file = response!.data!;
      this.state.fileName = this.state.file!.filename!;
      this.state.status = "success";
      this.emitter.emit("success", null);
    } catch (error) {
      this.state.status = "error";
      this.emitter.emit("error", null);
    }
  }
}

type TUploadHandlerState = {
  uploads: Upload[];
};

export class UploadHandler {
  state: TUploadHandlerState = {
    uploads: [],
  };
  private emitter = new EventEmitter<{
    error: Upload;
    success: Upload;
  }>();

  on = this.emitter.on.bind(this.emitter);

  constructor(private endPoint: string) {
    makeObservable(this, { state: observable });
  }

  public download(id: number) {
    return axios.get<UploadedFile>(`${this.endPoint}?id=${id}`);
  }

  upload(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.queue(file);
      }
    }
  }

  private remove(upload: Upload) {
    this.state.uploads = this.state.uploads.filter(
      (c) => c.state.id !== upload.state.id,
    );
  }

  private queue(file: File) {
    const upload = new Upload(this.endPoint, file);
    this.state.uploads.push(upload);

    upload.on("error", () => {
      this.emitter.emit("error", upload);
    });
    upload.on("success", () => {
      this.emitter.emit("success", upload);
      this.remove(upload);
    });
    upload.on("remove", () => {
      this.remove(upload);
    });
  }
}
