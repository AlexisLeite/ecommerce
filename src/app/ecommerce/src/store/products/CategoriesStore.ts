import { Category } from "@prisma/client";
import { CRUDStore, TCRUDStorePagination } from "common";
import { refresh, remove } from "./server/CategoriesServer";

export type TCategoryListData = Category;

export class CategoriesListStore extends CRUDStore<TCategoryListData> {
  private constructor(data?: TCRUDStorePagination<TCategoryListData>) {
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
            console.log(data);
            return data!;
          }
        : undefined,
    });
  }

  private static _instance: CategoriesListStore;
  public static getInstance(data?: TCRUDStorePagination<TCategoryListData>) {
    if (typeof window === "undefined") return new CategoriesListStore(data);

    if (!this._instance) {
      this._instance = new CategoriesListStore(data);
    }
    return this._instance;
  }

  public get categories(): TCategoryListData[] {
    return this.currentPage?.data || [];
  }
}
