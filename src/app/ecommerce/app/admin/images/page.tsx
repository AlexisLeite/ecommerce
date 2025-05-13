"use server";

import { refresh } from "@/src/store/server/ImagesServer";
import { ImagesList } from "./ImagesList";

export default async function AdminPage() {
  const data = await refresh();

  return <ImagesList data={data} />;
}
