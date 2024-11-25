import { cookies } from "next/headers";
import prisma from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function getCart() {
  let cart;
  try {
    const { userId } = await auth();
    if (!userId) {
      const visitorId = cookies().get("visitor_id")?.value;
      cart = await prisma.basket.findMany({
        where: { userId: visitorId },
      });
      return cart;
    }
    cart = await prisma.basket.findMany({
      where: { userId: userId },
    });
    return cart;
  } catch (error) {
    console.log(error);
    throw new Error("An Error occured while fetching cart");
  }
}

export async function addItemToCart(productId: string, quantity: number) {
  const visitorId = cookies().get("visitor_id")?.value;

  if (!visitorId) {
    const { userId } = await auth();

    await prisma.basket.upsert({
      where: { userId },
      update: { quantity: { increment: quantity } },
      create: {
        userId,
        productId,
        quantity,
      },
    });

    return;
  }

  await prisma.basket.upsert({
    where: { userId: visitorId },
    update: { quantity: { increment: quantity } },
    create: {
      userId: visitorId,
      productId,
      quantity,
    },
  });
}
