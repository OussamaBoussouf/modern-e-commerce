"use server";

import prisma from "@/services/db/db";
import { cookies } from "next/headers";

export const removeProductFromCart = async (productId: string) => {
  try {
   
    const cartId = cookies().get('cartId')!.value;

    await prisma.cartProduct.delete({
      where: {
        cartId_productId: {
          productId,
          cartId,
        },
      }
    });

    return { message: "success" };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
