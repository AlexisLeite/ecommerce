import { getPrismaClient } from "@/src/prisma/getClient";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const image = await getPrismaClient().image.findFirst({
    where: { id: Number.parseInt((await params).id) },
  });

  if (!image) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(image.data, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
