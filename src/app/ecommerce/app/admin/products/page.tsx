"use server";

import { refresh } from "@/src/store/server/ProductsServer";
import { ProductsList } from "../../../src/components/crud/ProductsList";

export default async function AdminPage() {
  const data = await refresh();

  return <ProductsList data={data} />;
}
