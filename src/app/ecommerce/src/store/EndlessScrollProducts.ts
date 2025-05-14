import { EndlessScrollStore, TCRUDStorePagination } from "common";
import { refresh, TProductListData } from "./server/ProductsServer";

export class EndlessScrollProducts extends EndlessScrollStore<TProductListData> {
  private constructor(data?: TCRUDStorePagination<TProductListData>) {
    super({
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

  private static _instance: EndlessScrollProducts;
  public static getInstance(data?: TCRUDStorePagination<TProductListData>) {
    if (!this._instance) {
      this._instance = new EndlessScrollProducts(data);
    }
    return this._instance;
  }

  public get products(): TProductListData[] {
    return this.currentPage?.data;
  }
}
