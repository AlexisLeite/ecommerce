"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TCRUDStorePagination } from "common";
import { Category } from "@prisma/client";
import { revalidate } from "./revalidations";
import { errorHandlingMiddleware } from "./errorHandlingMiddleware";

export type TCreateCategory = Pick<
  Category,
  "description" | "name" | "imageId" | "parentId"
>;
export type TUpdateCategory = TCreateCategory & { id: number };
export type TCategoryListData = Category & { parent: { name: string } | null };

export async function getAll(): Promise<TCategoryListData[]> {
  return getPrismaClient().category.findMany({
    select: {
      parent: { select: { name: true } },
      description: true,
      id: true,
      name: true,
      imageId: true,
      parentId: true,
      reg_date: true,
    },
    orderBy: [{ name: "asc" }, { id: "asc" }],
  });
}

export async function refresh(page: number = 0) {
  return errorHandlingMiddleware<TCRUDStorePagination<TCategoryListData>>(
    async () => {
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
          select: {
            parent: { select: { name: true } },
            description: true,
            id: true,
            name: true,
            imageId: true,
            parentId: true,
            reg_date: true,
          },
          take: 10,
          skip: 10 * (currentPage - 1),
          orderBy: [{ name: "asc" }, { id: "asc" }],
        }),
      };
    },
  );
}

export async function remove(categoryId: number) {
  return errorHandlingMiddleware(async () => {
    const result = await getPrismaClient().category.delete({
      where: { id: categoryId },
    });

    revalidate("categories");

    return result;
  });
}

export async function create(category: TCreateCategory) {
  return errorHandlingMiddleware(async () => {
    const result = await getPrismaClient().category.create({
      data: { ...category, reg_date: new Date() },
    });

    revalidate("categories");

    return result;
  });
}

export async function update(category: TUpdateCategory) {
  return errorHandlingMiddleware(async () => {
    let current: number | null | undefined = category.parentId;
    while (current) {
      current = (
        await getPrismaClient().category.findFirst({ where: { id: current } })
      )?.parentId;
      if (current === category.id) {
        throw new Error(
          "Cannot update the category because it would make a cicrular dependency",
        );
      }
    }

    const result = await getPrismaClient().category.update({
      data: { ...category, reg_date: new Date() },
      where: { id: category.id },
    });

    revalidate("categories");

    return result;
  });
}
