import { NextRequest, NextResponse } from "next/server";
import { getPrismaClient } from "@/src/prisma/getClient";

export const runtime = "nodejs"; // ensure Buffer/fs availability

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const title = (formData.get("title") as string) ?? file?.name;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const created = await getPrismaClient().image.create({
    data: {
      title,
      data: buffer,
      reg_date: new Date(),
    },
  });

  return NextResponse.json({
    id: created.id,
  });
}
