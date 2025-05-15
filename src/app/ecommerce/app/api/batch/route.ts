import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { getPrismaClient } from "@/src/prisma/getClient";

export const runtime = "nodejs"; // ensure Buffer/fs availability

export async function POST(request: NextRequest) {
  try {
    await getPrismaClient().$transaction(async () => {
      const formData = await request.formData();

      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 },
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const zip = await JSZip.loadAsync(buffer);
      const defEntry = zip.file("definitions.xlsx");
      if (!defEntry) {
        return NextResponse.json(
          { error: "definitions.xlsx not found in zip" },
          { status: 404 },
        );
      }

      const imagesMap: Record<string, number> = {};
      const catsMap: Record<string, number> = {};

      const images = zip.folder("images")!.files!;
      for await (const image of Object.values(images)) {
        const arrayBuffer = await image.async("arraybuffer");
        const buffer = Buffer.from(arrayBuffer);

        const created = await getPrismaClient().image.create({
          data: {
            title: image.name,
            data: buffer,
            reg_date: new Date(),
          },
        });

        if (!created?.id) {
          throw new Error(`Cannot create image '${image.name}'`);
        } else {
          imagesMap[image.name.split("/").at(-1)!] = created.id;
        }
      }

      const defArrayBuffer = await defEntry.async("arraybuffer");
      const workbook = XLSX.read(defArrayBuffer, { type: "array" });

      const catsSheet = workbook.Sheets["Categorias"];
      const ref = catsSheet["!ref"]!;
      let maxRow = Number.parseInt(ref.match(/(\d+)$/)![1]);

      const notFoundImages: string[] = [];

      for (let i = 2; i <= maxRow; i++) {
        const name = catsSheet[`A${i}`]?.h;
        const description = catsSheet[`B${i}`]?.h || "";
        const image = (catsSheet[`C${i}`]?.h as string)?.trim?.();
        const parent = (catsSheet[`D${i}`]?.h as string)?.trim?.();

        if (!name) {
          throw new Error(`Cannot create a category without name at row ${i}`);
        }

        if (parent && !catsMap[parent]) {
          throw new Error(
            `Cannot connect category ${name} with parent ${parent}. The parent was not created yet`,
          );
        }

        if (!image || !imagesMap[image]) {
          notFoundImages.push(image);
        } else {
          const category = await getPrismaClient().category.create({
            data: {
              description,
              name,
              imageId: imagesMap[image],
              ...(parent ? { parentId: catsMap[parent] } : {}),
              reg_date: new Date(),
            },
          });

          if (!category?.id) {
            throw new Error(`Cannot create category '${name}'`);
          } else {
            catsMap[category.name] = category.id;
          }
        }
      }

      if (notFoundImages.length) {
        throw new Error(
          "There are missing images: " + notFoundImages.join(", "),
        );
      }

      const prodSheet = workbook.Sheets["Productos"];
      const prodsRef = prodSheet["!ref"]!;
      maxRow = Number.parseInt(prodsRef.match(/(\d+)$/)![1]);

      for (let i = 2; i <= maxRow; i++) {
        const name = prodSheet[`A${i}`]?.h;
        const description = prodSheet[`B${i}`]?.h || "";
        const price = prodSheet[`C${i}`]?.v;
        const _stock = Number.parseInt(prodSheet[`D${i}`]?.h);
        const images = (prodSheet[`E${i}`]?.h as string)
          .split(",")
          .map((c) => c.trim());
        const categories = (prodSheet[`F${i}`]?.h as string)
          .split(",")
          .map((c) => c.trim());

        if (!name) {
          throw new Error(`Cannot create a category without name at row ${i}`);
        }

        for (const i of images) {
          if (!imagesMap[i]) {
            throw new Error(
              `Cannot find image ${i} while creating product ${name}`,
            );
          }
        }

        for (const c of categories) {
          if (!catsMap[c]) {
            throw new Error(
              `Cannot find category ${c} while creating product ${name}`,
            );
          }
        }

        const category = await getPrismaClient().product.create({
          data: {
            description,
            name,
            price,
            categories: {
              connect: categories.map((c) => ({ id: catsMap[c] })),
            },
            images: {
              connect: images.map((c) => ({ id: imagesMap[c] })),
            },
            creator: { connect: { id: 2 } },
            reg_date: new Date(),
          },
        });

        if (!category?.id) {
          throw new Error(`Cannot create category '${name}'`);
        } else {
          catsMap[category.name] = category.id;
        }
      }
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: String(e) });
  }
}
