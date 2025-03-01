"use server";

import prisma from "@/services/db/db";
import { cookies } from "next/headers";

export const manageCartQuantity = async ({
  operation,
  productId,
}: {
  operation: string;
  productId: string;
}) => {
  try {
    const cartId = cookies().get("cartId")!.value;

    const product = await prisma.cartProduct.findUnique({
      where: {
        cartId_productId: {
          productId,
          cartId,
        },
      },
    });

    if (operation === "increment") {
      //INCREMENT PRODUCT QUANTITY IN CART ----------------
      await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            productId,
            cartId,
          },
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      //REMOVE PRODUCT FROM CART WHEN IT REACHS ONE --------------
      if (product?.quantity === 1) {
        await prisma.cartProduct.delete({
          where: {
            cartId_productId: {
              productId,
              cartId,
            },
          },
        });

        return;
      }
      //DECREMENT PRODUCT QUANTITY IN CART ----------------
      await prisma.cartProduct.update({
        where: {
          cartId_productId: {
            productId,
            cartId,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
