"use client";

import { createContext, useContext, ReactNode } from "react";
import { getProductsStore } from ".";
import { ProductsListStore } from "./ProductsStore";

const StoreContext = createContext<ProductsListStore>({} as any);

export function useProducts() {
  return useContext(StoreContext)!;
}

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={getProductsStore()}>
    {children}
  </StoreContext.Provider>
);
