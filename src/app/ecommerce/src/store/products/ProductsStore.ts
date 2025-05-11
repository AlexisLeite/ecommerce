import { Image, Product } from "@prisma/client";
import { CRUDStore, TCRUDStorePagination } from "common";
import { refresh } from "./server/refresh";
import { removeProduct } from "./server/removeProduct";

export type TProductListData = Pick<
  Product,
  "id" | "name" | "description" | "price"
> & { images: Pick<Image, "file">[] };

export class ProductsListStore extends CRUDStore<TProductListData> {
  private constructor(data?: TCRUDStorePagination<TProductListData>) {
    super({
      delete: async (id) => {
        try {
          await removeProduct(id);
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
      save: () => Promise.resolve({ success: false, error: "Not implemented" }),
    });
  }

  private static _instance: ProductsListStore;
  public static getInstance(data?: TCRUDStorePagination<TProductListData>) {
    if (!this._instance) {
      this._instance = new ProductsListStore(data);
    }
    return this._instance;
  }

  public get products(): TProductListData[] {
    return this.state.pages[this.state.currentPage]?.data || [];
  }
}
