import prisma from "@/lib/db";
import { cache } from "react";

export const getAllProducts = cache(async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
});
