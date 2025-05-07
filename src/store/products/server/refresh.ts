"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export type TPage<T> = {
  data: T[];
  pages: number;
  currentPage: number;
};

export async function refresh(
  page: number = 0,
  revalidate = true,
): Promise<TPage<Product>> {
  if (revalidate) {
    revalidatePath("/");
  }

  const totalProducts = await getPrismaClient().product.count();
  const pages = Math.ceil(totalProducts / 10);
  const currentPage = Math.max(1, Math.min(page, pages));

  console.log({ skip: 10 * (currentPage - 1) });

  return {
    pages,
    currentPage,
    data: await getPrismaClient().product.findMany({
      take: 10,
      skip: 10 * (currentPage - 1),
      orderBy: { name: "asc" },
    }),
  };
}
