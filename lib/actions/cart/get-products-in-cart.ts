"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { cache } from "react";

export const getProductsInCart = cache(async ()  => {
  try {
    const { userId } = await auth();
    const visitorId = cookies().get("visitorId")?.value;

    const where = { ...(userId ? { userId } : { visitorId }) };

    const cart = await prisma.cart.findMany({
      where,
      include: {
        product: true,
      },
      orderBy: {
        productId: "desc",
      },
    });

    return cart;
  } catch (error: any) {
    console.log(error);
    return error;
  }
});
