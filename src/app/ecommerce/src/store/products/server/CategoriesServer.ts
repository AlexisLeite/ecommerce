"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TCRUDStorePagination } from "common";
import { TCategoryListData } from "../CategoriesStore";
import { Category } from "@prisma/client";

export async function refresh(
  page: number = 0,
): Promise<TCRUDStorePagination<TCategoryListData>> {
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

  return result;
}

export type TCreateCategory = Pick<
  Category,
  "description" | "name" | "imageId"
>;

export async function create(category: TCreateCategory) {
  try {
    const result = await getPrismaClient().category.create({
      data: { ...category, reg_date: new Date() },
    });

    return result;
  } catch (e) {
    return null;
  }
}
