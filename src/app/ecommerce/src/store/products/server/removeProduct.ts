"use server";

import { getPrismaClient } from "@/src/prisma/getClient";
import { revalidatePath } from "next/cache";

export async function removeProduct(productId: number) {
  const result = await getPrismaClient().product.delete({
    where: { id: productId },
  });

  revalidatePath("/");

  return result;
}
