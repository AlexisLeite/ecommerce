"use client";

import { createContext, useContext, ReactNode } from "react";
import { getProductsStore } from ".";
import { ProductsListStore, type TProductListData } from "./ProductsStore";
import type { TPage } from "./server/refresh";

const StoreContext = createContext<ProductsListStore>({} as any);

export function useProducts() {
  return useContext(StoreContext)!;
}

export const StoreProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: TPage<TProductListData>;
}) => (
  <StoreContext.Provider value={getProductsStore(data)}>
    {children}
  </StoreContext.Provider>
);
