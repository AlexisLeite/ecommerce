import { enableStaticRendering } from "mobx-react-lite";
import { ProductsStore } from "./ProductsStore";
import { Product } from "@prisma/client";
import { TPage } from "./server/refresh";

enableStaticRendering(typeof window === "undefined");

let store: ProductsStore | null = null;
export function getProductsStore(data: TPage<Product>) {
  if (store) {
    return store;
  }

  if (typeof window === "undefined") {
    return new ProductsStore(data);
  }

  store = new ProductsStore(data);
  return store;
}
