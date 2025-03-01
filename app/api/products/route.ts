import prisma from "@/services/db/db";
import { NextRequest, NextResponse } from "next/server";

const RECORD_PER_PAGE = 9;

export async function POST(request: NextRequest) {
  let { category, sort, price, page, search } = await request.json();

  //APPLY SORT & PRICE & CATEGORY FILTERS
  const where = {
    ...(category && { category: { contains: category } }),
    ...(price && { price: { lte: parseFloat(price) } }),
    ...(search && { name: { contains: search, mode: "insensitive" } }),
  };

  const orderBy = {
    ...(sort &&
      (sort === "new"
        ? { createdAt: "desc" }
        : { price: sort === "asc" ? "asc" : "desc" })),
  };

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  //APPLY PAGINATION
  page = page ?? 1;
  const start = (parseInt(page) - 1) * RECORD_PER_PAGE;
  const end = page ? RECORD_PER_PAGE * page : RECORD_PER_PAGE;

  if (products.length > RECORD_PER_PAGE) {
    let pageInfo: Record<string, number> = {};

    pageInfo["pageCount"] = Math.ceil(products.length / RECORD_PER_PAGE);

    if (page * RECORD_PER_PAGE < products.length)
      pageInfo["next"] = parseInt(page) + 1;
    if (page - 1 > 0) pageInfo["previous"] = parseInt(page) - 1;

    const slicedProduct = products.slice(start, end);

    return NextResponse.json({ products: slicedProduct, pageInfo });
  }

  return NextResponse.json({ products, pageInfo: null });
}

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json({ products });
}
