import prisma from "@/lib/db";

export const hasExccededStockLimit = async (
  productId: string,
  quantity: number,
  visitorId?: string,
  userId?: string
) => {
  const productStock = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      stock: true,
    },
  });

  if (quantity > productStock!.stock) {
    return true;
  }

  let productExistInCart;

  if (visitorId) {
    productExistInCart = await prisma.cart.findUnique({
      where: {
        productId_visitorId: {
          productId,
          visitorId,
        },
      },
    });
  } else if (userId) {
    productExistInCart = await prisma.cart.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });
  }

  if (
    productExistInCart &&
    productExistInCart.quantity + quantity > productStock!.stock
  ) {
    return true;
  }

  return false;
};
