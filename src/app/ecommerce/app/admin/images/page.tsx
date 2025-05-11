"use server";

import { refresh } from "@/src/store/products/server/refresh";
import { ImagesList } from "./ImagesList";

export default async function AdminPage() {
  const data = await refresh();

  return <ImagesList data={data} />;
}
