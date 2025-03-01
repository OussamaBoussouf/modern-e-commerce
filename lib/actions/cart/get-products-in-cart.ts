"use server";

import prisma from "@/services/db/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const getProductsInCart = async () => {
  try {
    const { userId } = await auth();

    const cartId = cookies().get('cartId')?.value;

    if(!cartId) return null;

    if (userId) {
    } else {
      const cart = await prisma.cart.findUnique({
        where: {
          id: cartId,
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      return cart;
    }
  
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

