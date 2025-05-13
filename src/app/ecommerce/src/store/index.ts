import { enableStaticRendering } from "mobx-react-lite";
import { ProductsListStore } from "./ProductsStore";

enableStaticRendering(typeof window === "undefined");

export function getProductsStore() {
  return ProductsListStore.getInstance;
}
