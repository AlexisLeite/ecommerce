import { enableStaticRendering } from "mobx-react-lite";
import { ProductsListStore, TProductListData } from "./ProductsStore";
import { TPage } from "./server/refresh";

enableStaticRendering(typeof window === "undefined");

export function getProductsStore(data: TPage<TProductListData>) {
  return new ProductsListStore(data);
}
