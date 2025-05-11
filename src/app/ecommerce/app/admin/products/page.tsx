"use server";

import { refresh } from "@/src/store/products/server/refresh";
import { ProductsList } from "./ProductsList";

export default async function AdminPage() {
  const data = await refresh();

  return <ProductsList data={data} />;
}
