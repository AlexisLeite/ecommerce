"use server";

import { refresh } from "@/src/store/products/server/ImagesServer";
import { ImagesList } from "./ImagesList";

export default async function AdminPage() {
  const data = await refresh();

  return <ImagesList data={data} />;
}
