"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TProductListData } from "../ProductsStore";
import { revalidatePath } from "next/cache";
import { TCRUDStorePagination } from "common";

export async function refresh(
  page: number = 0,
  revalidate = true,
): Promise<TCRUDStorePagination<TProductListData>> {
  if (revalidate) {
    revalidatePath("/");
  }

  const pageSize = 10;
  const totalRegisters = await getPrismaClient().product.count();
  const totalPages = Math.ceil(totalRegisters / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  return {
    pageSize,
    totalPages,
    totalRegisters,
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
