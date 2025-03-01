import prisma from "@/services/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { visitorId, userId } = await req.json();

  if (!visitorId || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters cookie or user_id" },
      { status: 400 }
    );
  }

  const [userExistInCart, userExistInUserTable, visitorExistInCart] =
    await Promise.all([
      prisma.cart.findFirst({
        where: {
          userId,
        },
      }),
      prisma.user.findFirst({
        where: {
          id: userId,
        },
      }),
      prisma.cart.findFirst({
        where: {
          visitorId,
        },
      }),
    ]);

  if (
    userExistInCart ||
    !visitorExistInCart ||
    (visitorExistInCart && userExistInUserTable)
  ) {
    return new NextResponse(null, { status: 200 });
  }

  await prisma.cart.updateMany({
    where: {
      visitorId,
    },
    data: {
      userId: userId,
      visitorId: null,
    },
  });

  return NextResponse.json(
    "Something went wrong while syncing the user with its cart",
    { status: 500 }
  );
}
