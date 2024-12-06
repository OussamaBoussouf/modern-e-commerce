"use server";

import prisma from "@/lib/db";

export const getNewArrivals = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
