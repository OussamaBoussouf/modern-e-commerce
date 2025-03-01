"use server";

import prisma from "@/services/db/db";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const addProductToCart = async (product: {
  productId: string;
  unitPrice: number;
  quantity: number;
}) => {
  try {
    const { productId, unitPrice, quantity } = product;

    const { userId } = await auth();

    
    const cartId = await getOrCreateCartId();

    const exceededStockLimit = await isGreaterThanStockLimit(productId, cartId, quantity);

    if(exceededStockLimit) throw new Error("You can't exceed the stock limit of this product");
    
    if (userId) {
    } else {
      await prisma.cartProduct.upsert({
        where: {
          cartId_productId: {
            cartId,
            productId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          productId,
          cartId,
          quantity,
          unitPrice,
        },
      });
    }

    return { message: "Product has been added successfully" };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const getOrCreateCartId = async () => {
  try {
    let cartId = cookies().get("cartId")?.value;

    if (!cartId) {
      const cart = await prisma.cart.create({
        data: {
          userId: null,
        },
      });

      cookies().set("cartId", cart.id);

      return cart.id;
    }
    return cartId;
  } catch (error) {
    throw new Error("Something went wrong while creating cartId");
  }
};

const isGreaterThanStockLimit = async (
  productId: string,
  cartId: string,
  quantity: number
) => {
  const productExistInCart = await prisma.cartProduct.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!productExistInCart) {
    if (product && product.stock >= quantity) {
      return false;
    }

    return true;
  } else {
    if (product && productExistInCart.quantity + quantity <= product.stock) {
      return false;
    }

    return true;
  }
};
