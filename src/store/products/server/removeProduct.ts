"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function removeProduct(product: Product) {
  const result = await getPrismaClient().product.delete({
    where: { id: product.id },
  });

  revalidatePath("/");

  return result;
}
