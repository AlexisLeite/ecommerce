"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { revalidatePath } from "next/cache";
import { TCRUDStorePagination } from "common";
import { TCategoryListData } from "../CategoriesStore";

export async function refresh(
  page: number = 0,
  revalidate = false,
): Promise<TCRUDStorePagination<TCategoryListData>> {
  if (revalidate) {
    revalidatePath("/");
  }

  const pageSize = 10;
  const totalRegisters = await getPrismaClient().category.count();
  const totalPages = Math.ceil(totalRegisters / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  return {
    pageSize,
    totalPages,
    totalRegisters,
    currentPage,
    data: await getPrismaClient().category.findMany({
      take: 10,
      skip: 10 * (currentPage - 1),
      orderBy: [{ name: "asc" }, { id: "asc" }],
    }),
  };
}

export async function remove(categoryId: number) {
  const result = await getPrismaClient().category.delete({
    where: { id: categoryId },
  });

  revalidatePath("/");

  return result;
}
