"use server";

import prisma from "@/lib/db";

export const getSomeProducts = async (take: number) => {
  try {
    const products = await prisma.product.findMany({
      take: take,
    });
    return products
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
