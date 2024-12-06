import prisma from "@/lib/db";

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
