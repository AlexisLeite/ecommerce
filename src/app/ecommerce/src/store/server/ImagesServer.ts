"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TCRUDStorePagination } from "common";
import { TImageListData } from "../ImagesStore";

export async function refresh(
  page: number = 0,
): Promise<TCRUDStorePagination<TImageListData>> {
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
  const img = await (
    await getPrismaClient()
  ).product.findFirst({
    where: { images: { some: { id: productId } } },
  });

  if (img) {
    throw "Cannot remove, element has dependencies";
  }

  const result = await getPrismaClient().image.delete({
    where: { id: productId },
  });

  return result;
}
