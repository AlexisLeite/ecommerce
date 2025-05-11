"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { revalidatePath } from "next/cache";
import { TCRUDStorePagination } from "common";
import { TImageListData } from "../ImagesStore";

export async function refresh(
  page: number = 0,
  revalidate = false,
): Promise<TCRUDStorePagination<TImageListData>> {
  if (revalidate) {
    revalidatePath("/");
  }

  const pageSize = 10;
  const totalRegisters = await getPrismaClient().image.count();
  const totalPages = Math.ceil(totalRegisters / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  return {
    pageSize,
    totalPages,
    totalRegisters,
    currentPage,
    data: await getPrismaClient().image.findMany({
      take: 10,
      skip: 10 * (currentPage - 1),
      select: {
        id: true,
        title: true,
      },
    }),
  };
}

export async function remove(productId: number) {
  const result = await getPrismaClient().product.delete({
    where: { id: productId },
  });

  revalidatePath("/");

  return result;
}
