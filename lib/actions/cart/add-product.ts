"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const addProductToCart = async (product: {
  productId: string;
  unitPrice: number;
  quantity: number;
}) => {
  try {
    const { productId, unitPrice, quantity } = product;

    const visitorId = cookies().get("visitorId")?.value;
    const { userId } = await auth();

    if (!visitorId && !userId)
      throw new Error(
        "Unauthorized to perform this action no 'cookie' or 'user_id' has been provided"
      );

    if (await hasExccededStockLimit(productId, quantity, userId, visitorId))
      throw new Error("You can't exceed the stock limit");

    //DIFFRENTIATE WHERE TO ADD ITEM BASED ON THE CONNECTED USER
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

    await prisma.cart.upsert({
      where,
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId,
        userId: userId || null,
        visitorId: userId ? null : visitorId,
        quantity,
        unitPrice,
      },
    });

    return { message: "Product has been added successfully" };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const hasExccededStockLimit = async (
  productId: string,
  quantity: number,
  userId: string | null,
  visitorId: string | undefined
) => {
  const productInfo = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      stock: true,
    },
  });

  if (quantity > productInfo!.stock) {
    return true;
  }

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

  const productExistInCart = await prisma.cart.findUnique({
    where,
  });

  if (
    productExistInCart &&
    productExistInCart.quantity + quantity > productInfo!.stock
  ) {
    return true;
  }

  return false;
};
