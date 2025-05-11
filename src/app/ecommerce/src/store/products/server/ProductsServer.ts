"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TProductListData } from "@/src/store/products/ProductsStore";
import { revalidatePath } from "next/cache";
import { TCRUDStorePagination } from "common";
import { Prisma } from "@prisma/client";

export async function refresh(
  page: number = 0,
  revalidate = false,
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
            id: true,
          },
        },
      },
      orderBy: [{ name: "asc" }, { id: "asc" }],
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

export async function search(query: string) {
  const client = await getPrismaClient();

  await client.$executeRaw`
    SET pg_trgm.similarity_threshold = 1;
  `;

  const results = await client.$queryRaw<
    Array<
      Prisma.PromiseReturnType<typeof client.product.findFirst> & {
        sml: number;
      }
    >
  >(Prisma.sql`
    SELECT p.*,
           similarity(p.name, ${query}) AS sml
      FROM "Product" AS p
     ORDER BY sml DESC
     LIMIT 10;
  `);

  return {
    pageSize: 10,
    totalPages: 1,
    totalRegisters: 10,
    currentPage: 1,
    data: results,
  };
}
