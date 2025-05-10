"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { revalidatePath } from "next/cache";
import { TProductListData } from "../ProductsStore";

export type TPage<T> = {
  data: T[];
  pages: number;
  currentPage: number;
};

export async function refresh(
  page: number = 0,
  revalidate = true,
): Promise<TPage<TProductListData>> {
  if (revalidate) {
    revalidatePath("/");
  }

  const totalProducts = await getPrismaClient().product.count();
  const pages = Math.ceil(totalProducts / 10);
  const currentPage = Math.max(1, Math.min(page, pages));

  return {
    pages,
    currentPage,
    data: await getPrismaClient().product.findMany({
      take: 10,
      skip: 10 * (currentPage - 1),
      select: {
        description: true,
        id: true,
        name: true,
        price: true,
        images: {
          select: {
            file: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  };
}
