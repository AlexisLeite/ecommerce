import { Image, Product } from "@prisma/client";
import { CRUDStore } from "common";
import { refresh } from "./server/refresh";

export type TProductListData = Pick<
  Product,
  "id" | "name" | "description" | "price"
> & { images: Pick<Image, "file">[] };

export class ProductsListStore extends CRUDStore<TProductListData> {
  private constructor() {
    super({
      delete: () =>
        Promise.resolve({ success: false, error: "Not implemented" }),
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
      save: () => Promise.resolve({ success: false, error: "Not implemented" }),
    });
  }

  private static _instance: ProductsListStore;
  public static get instance() {
    if (!this._instance) {
      this._instance = new ProductsListStore();
    }
    return this._instance;
  }

  public get products(): TProductListData[] {
    return this.state.pages[this.state.currentPage]?.data || [];
  }
}
