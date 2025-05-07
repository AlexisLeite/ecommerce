"use client";

import { createContext, ReactNode, useContext } from "react";
import { ProductsStore } from "./ProductsStore";
import { Product } from "@prisma/client";
import { TPage } from "./server/refresh";
import { getProductsStore } from ".";

const StoreContext = createContext<ProductsStore>({} as any);

export function useProducts() {
  return useContext(StoreContext)!;
}

export const StoreProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: TPage<Product>;
}) => (
  <StoreContext.Provider value={getProductsStore(data)}>
    {children}
  </StoreContext.Provider>
);
