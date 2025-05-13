"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { TProductListData } from "@/src/store/ProductsStore";
import { TCRUDStorePagination } from "common";
import { Prisma, Product } from "@prisma/client";
import { revalidate } from "@/src/store/server/revalidations";
import { errorHandlingMiddleware } from "@/src/store/server/errorHandlingMiddleware";

export type TCreateProduct = Pick<Product, "description" | "name" | "price"> & {
  images: number[];
  categories: number[];
};

export type TUpdateProduct = TCreateProduct & { id: number };

export async function create(product: TCreateProduct) {
  return errorHandlingMiddleware(async () => {
    const result = await getPrismaClient().product.create({
      data: {
        ...product,
        creator: { connect: { id: 1 } },
        reg_date: new Date(),
        categories: { connect: product.categories.map((c) => ({ id: c })) },
        images: { connect: product.images.map((c) => ({ id: c })) },
      },
    });

    revalidate("products");

    return result;
  });
}
export async function update(product: TUpdateProduct) {
  return errorHandlingMiddleware(async () => {
    const result = await getPrismaClient().product.update({
      where: { id: product.id },
      data: {
        ...product,
        creator: { connect: { id: 1 } },
        reg_date: new Date(),
        categories: { connect: product.categories.map((c) => ({ id: c })) },
        images: { connect: product.images.map((c) => ({ id: c })) },
        id: undefined,
      },
    });

    revalidate("products");

    return result;
  });
}

export async function refresh(
  page: number = 0,
): Promise<TCRUDStorePagination<TProductListData>> {
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

  revalidate("products");

  return result;
}

export async function search(query: string) {
  const client = await getPrismaClient();

  await client.$executeRaw`
    SET pg_trgm.similarity_threshold = 0;
  `;

  const results = await client.$queryRaw<
    Array<
      Prisma.PromiseReturnType<typeof client.product.findFirst> & {
        sml: number;
      }
    >
  >(Prisma.sql`
    WITH query_norm AS (
      SELECT lower(unaccent(${query})) AS q
    )
    SELECT
      p.*,
      (p.name_norm = q)         AS is_exact,
      similarity(p.name_norm, q) AS sim
    FROM "Product" p
    CROSS JOIN query_norm
    ORDER BY
      is_exact DESC,
      sim      DESC
    LIMIT 30;`);

  return {
    pageSize: 30,
    totalPages: 1,
    totalRegisters: 10,
    currentPage: 1,
    data: results,
  };
}
