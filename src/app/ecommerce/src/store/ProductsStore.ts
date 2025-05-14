import { CRUDStore, TCRUDStorePagination } from "common";
import { refresh, remove, TProductListData } from "./server/ProductsServer";

export class ProductsListStore extends CRUDStore<TProductListData> {
  private constructor(data?: TCRUDStorePagination<TProductListData>) {
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

  private static _instance: ProductsListStore;
  public static getInstance(data?: TCRUDStorePagination<TProductListData>) {
    if (typeof window === "undefined") return new ProductsListStore(data);

    if (!this._instance) {
      this._instance = new ProductsListStore(data);
    }
    return this._instance;
  }

  public get products(): TProductListData[] {
    return this.currentPage?.data || [];
  }
}
