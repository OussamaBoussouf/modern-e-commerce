"use server";

import prisma from "@/services/db/db";
import { cache } from "react";

export const getSomeProducts = cache(async (take: number) => {
  try {
    const products = await prisma.product.findMany({
      take: take,
    });
    return products;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
});
