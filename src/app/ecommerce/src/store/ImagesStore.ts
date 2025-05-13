import { Image } from "@prisma/client";
import { CRUDStore, TCRUDStorePagination } from "common";
import { refresh, remove } from "./server/ImagesServer";

export type TImageListData = Pick<Image, "id" | "title">;

export class ImagesListStore extends CRUDStore<TImageListData> {
  private constructor(data?: TCRUDStorePagination<TImageListData>) {
    super({
      delete: async (id) => {
        try {
          await remove(id);
          return {
            success: true,
          };
        } catch (error) {
          return { error: String(error), success: false };
        }
      },
      findPaged: async (page) => {
        try {
          const result = await refresh(page);

          return {
            success: !!result,
            result,
          };
        } catch (error) {
          return {
            success: false,
            error: `Error while loading (${String(error)})`,
          };
        }
      },
      getInitialData: data
        ? () => {
            return data!;
          }
        : undefined,
    });
  }

  private static _instance: ImagesListStore;
  public static getInstance(data?: TCRUDStorePagination<TImageListData>) {
    if (typeof window === "undefined") return new ImagesListStore(data);

    if (!this._instance) {
      this._instance = new ImagesListStore(data);
    }
    return this._instance;
  }

  public get images(): TImageListData[] {
    return this.state.pages[this.state.currentPage]?.data || [];
  }
}
