"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const removeProductFromCart = async (productId: string) => {
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

    await prisma.cart.delete({
      where,
    });

    return { message: "success" };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
