"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { errorHandlingMiddleware } from "./errorHandlingMiddleware";

const client = await getPrismaClient();

async function backup() {
  const products = await client.product.findMany({
    select: {
      categories: { select: { id: true } },
      images: { select: { id: true } },
      id: true,
      creatorId: true,
      description: true,
      name: true,
      price: true,
      reg_date: true,
    },
  });
  const categories = await client.category.findMany();
  const images = await client.image.findMany();

  return {
    products,
    categories,
    images: images.map((c) => ({ ...c, data: [...c.data.values()] })),
  };
}

export async function downloadBackup() {
  const str = JSON.stringify(await backup());

  return str;
}

export async function uploadBackup(content: string) {
  const parsed = JSON.parse(content) as Awaited<ReturnType<typeof backup>>;
  return errorHandlingMiddleware(async () => {
    await client.$transaction(async (tx) => {
      await tx.image.createMany({
        data: parsed.images.map((c) => ({
          ...c,
          data: new Uint8Array(c.data),
        })),
      });

      await tx.category.createMany({
        data: parsed.categories,
      });

      for (const p of parsed.products) {
        await tx.product.create({
          data: {
            ...p,
            categories: { connect: p.categories.map((c) => ({ id: c.id })) },
            images: { connect: p.images.map((c) => ({ id: c.id })) },
          },
        });
      }
    });
  });
}
