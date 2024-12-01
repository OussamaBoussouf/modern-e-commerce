import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let products;

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("collection");

  if (query === "new-arrivals") {
    products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  } else if (query === "random-products") {
    products = await prisma.product.findMany({
      take: 12,
    });
  }

  return NextResponse.json({ products });
}
