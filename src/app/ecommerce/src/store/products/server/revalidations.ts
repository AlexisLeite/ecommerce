"use server";

import { revalidatePath } from "next/cache";

/**
 * This object must be of type Record<string, [string, 'page' | 'layout'][]>
 */
const revalidations = Object.freeze({
  categories: [
    ["/", "page"],
    ["/admin", "layout"],
  ],
  products: [
    ["/", "page"],
    ["/admin", "layout"],
  ],
  images: [
    ["/", "page"],
    ["/admin", "layout"],
  ],
});

export async function revalidate(key: keyof typeof revalidations) {
  revalidations[key].forEach((c) =>
    revalidatePath(c[0], c[1] as "page" | "layout"),
  );
}
