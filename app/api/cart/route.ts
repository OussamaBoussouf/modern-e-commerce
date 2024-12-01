import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { hasExccededStockLimit } from "./helper";


export async function POST(req: NextRequest) {
  try {
    const visitorId = req.cookies.get("visitorId")?.value;
    const { userId } = await auth();

    const { productId, quantity, unitPrice } = (await req.json()) as {
      productId: string;
      quantity: number;
      unitPrice: number;
    };

    if (!visitorId && !userId) {
      return NextResponse.json("Unauthorized to perform this action", {
        status: 403,
      });
    }

    // DIFFRENTIATE WHERE TO ADD ITEM BASED ON CURRENT USER
    if (userId) {
      return NextResponse.json("Unsuccess", { status: 500 });
    } else if (visitorId) {
      if (await hasExccededStockLimit(productId, quantity, visitorId)) {
        return NextResponse.json(
          { message: "You can't exceed the stock limit" },
          { status: 400 }
        );
      }

      await prisma.cart.upsert({
        where: {
          productId_visitorId: {
            productId,
            visitorId,
          },
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
        create: {
          productId,
          visitorId,
          quantity,
          unitPrice,
        },
      });

      return NextResponse.json(
        { message: "Product has been added successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Faild to add item" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  let cart;
  try {
    const { userId } = await auth();

    if (!userId) {
      const visitorId = req.cookies.get("visitorId")?.value;

      cart = await prisma.cart.findMany({
        where: { visitorId },
        include: {
          product: true,
        },
        orderBy: {
          productId: "desc",
        },
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", { status: 200 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { productId } = await req.json();

    const visitorId = req.cookies.get("visitorId")?.value;
    const { userId } = await auth();

    let deletedProduct;

    if (userId) {
      deletedProduct = await prisma.cart.delete({
        where: {
          productId_userId: {
            productId,
            userId,
          },
        },
      });
    } else if (visitorId) {
      deletedProduct = await prisma.cart.delete({
        where: {
          productId_visitorId: {
            productId,
            visitorId,
          },
        },
      });
    }
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const { operation, productId } = (await req.json()) as {
    operation: string;
    productId: string;
  };
  const visitorId = req.cookies.get("visitorId")?.value;
  const { userId } = await auth();

  if (!visitorId && !userId) {
    return NextResponse.json("Unauthorized to perform this action", {
      status: 403,
    });
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
    if (product?.quantity === 1) {
      await prisma.cart.delete({
        where,
      });
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
    await prisma.cart.update({
      where,
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  }

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
