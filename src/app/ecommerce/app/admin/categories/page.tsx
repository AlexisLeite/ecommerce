"use server";

import { CategoriesList } from "@/src/components/crud/CategoriesList";
import {
  refresh,
  TCategoryListData,
} from "@/src/store/server/CategoriesServer";
import { TCRUDStorePagination } from "common";

export default async function AdminPage() {
  const data = await refresh();

  return (
    <CategoriesList data={data as TCRUDStorePagination<TCategoryListData>} />
  );
}
