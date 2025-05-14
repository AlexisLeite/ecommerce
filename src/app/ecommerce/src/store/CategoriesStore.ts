import { Category } from "@prisma/client";
import { CRUDStore, TCRUDStorePagination } from "common";
import {
  getAll,
  refresh,
  remove,
  TCategoryListData,
} from "./server/CategoriesServer";
import { makeObservable, observable } from "mobx";
import { parseServerResponse } from "./server/processServerResponse";
import { isErrorResponse } from "./server/errorHandlingMiddleware";

export class CategoriesListStore extends CRUDStore<TCategoryListData> {
  private localState: {
    allCategories: Category[];
  } = { allCategories: [] };

  constructor(data?: TCRUDStorePagination<TCategoryListData>) {
    super({
      delete: async (id) => {
        const result = await parseServerResponse(remove(id));

        return {
          success: !isErrorResponse(result),
        };
      },
      findPaged: async (page) => {
        const result = await parseServerResponse(refresh(page));

        return {
          success: result !== null,
          result: result || undefined,
        };
      },
      getInitialData: data
        ? () => {
            return data!;
          }
        : undefined,
    });

    makeObservable<CategoriesListStore, "localState">(this, {
      localState: observable,
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

  public get allCategories() {
    return this.localState.allCategories;
  }

  public async refreshAllCategories() {
    this.localState.allCategories = (await parseServerResponse(getAll())) || [];
  }
}
