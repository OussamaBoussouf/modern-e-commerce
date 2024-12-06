"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const manageCartQuantity = async ({
  operation,
  productId,
}: {
  operation: string;
  productId: string;
}) => {
  try {
    const visitorId = cookies().get("visitorId")?.value;
    const { userId } = await auth();

    if (!visitorId && !userId)
      throw new Error(
        "Unauthorized to perform this action no 'cookie' or 'user_id' has been provided"
      );
      

    const where = userId
      ? {
          productId_userId: {
            productId,
            userId,
          },
        }
      : {
          productId_visitorId: {
            productId,
            visitorId: visitorId!,
          },
        };


    if (operation === "increment") {
      await prisma.cart.update({
        where,
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      const product = await prisma.cart.findUnique({
        where,
      });

      //REMOVE THE PRODUCT FROM CART WHEN QUANTITY IS BELOW 1
      if (product?.quantity === 1) {
        await prisma.cart.delete({
          where,
        });
      } else {
        await prisma.cart.update({
          where,
          data: {
            quantity: {
              decrement: 1,
            },
          },
        });
      }
    }

    return { message: "Success" };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
