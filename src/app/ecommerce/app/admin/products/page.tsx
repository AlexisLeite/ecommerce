"use server";

import { refresh } from "@/src/store/products/server/ProductsServer";
import { ProductsList } from "./ProductsList";

export default async function AdminPage() {
  const data = await refresh();

  return <ProductsList data={data} />;
}
