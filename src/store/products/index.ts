import { enableStaticRendering } from "mobx-react-lite";
import { ProductsStore } from "./ProductsStore";
import { Product } from "@prisma/client";
import { TPage } from "./server/refresh";

enableStaticRendering(typeof window === "undefined");

export function getProductsStore(data: TPage<Product>) {
  return new ProductsStore(data);
}
