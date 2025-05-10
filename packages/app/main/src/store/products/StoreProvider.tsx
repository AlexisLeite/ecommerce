"use client";

import { createContext, ReactNode, useContext } from "react";
import { ProductsListStore, type TProductListData } from "./ProductsStore";
import type { TPage } from "./server/refresh";
import { getProductsStore } from ".";

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
