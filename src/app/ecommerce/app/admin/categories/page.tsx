"use server";

import { refresh } from "@/src/store/products/server/CategoriesServer";
import { CategoriesList } from "./CategoriesList";

export default async function AdminPage() {
  const data = await refresh();

  return <CategoriesList data={data} />;
}
