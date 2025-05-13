"use server";

import { CategoriesList } from "@/src/store/products/CategoriesList";
import {
  refresh,
  TCategoryListData,
} from "@/src/store/products/server/CategoriesServer";
import { TCRUDStorePagination } from "common";

export default async function AdminPage() {
  const data = await refresh();

  return (
    <CategoriesList data={data as TCRUDStorePagination<TCategoryListData>} />
  );
}
