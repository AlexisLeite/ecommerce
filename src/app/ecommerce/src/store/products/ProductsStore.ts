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

  public get currentPage() {
    return this.state.currentPage;
  }

  public get hasPrevious() {
    return this.state.currentPage > 1;
  }

  public get hasMore() {
    return this.state.currentPage < this.state.totalPages;
  }

  public get products() {
    return this.state.data;
  }

  public next() {
    this.state.currentPage++;
    return this.refresh();
  }
}
