import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/services/stripeService";

const endpointSecret = process.env.WEBHOOK_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  // Get the signature sent by Stripe
  const signature = req.headers.get("stripe-signature")!;

  if (!signature) {
    return NextResponse.json(
      { message: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  //Read raw body as a buffer
  const body = await req.text();

  let event;

  //Check if the request is issued from stripe
  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }

  if (event?.type === "checkout.session.completed") {
    const sessionId = event.data.object.id;
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ["data.price.product"],
    });

    await Promise.all(
      lineItems.data.map(async (item) => {
        try {
          const productId = item.price?.product.metadata
            .product_id_db as string;
          const userId = item.price?.product.metadata.userId as string;

          await prisma.$transaction([
            prisma.product.update({
              where: {
                id: productId,
              },
              data: {
                stock: {
                  decrement: item.quantity!,
                },
              },
            }),
            prisma.cart.delete({
              where: {
                productId_userId: {
                  productId,
                  userId,
                },
              },
            }),
          ]);
          
        } catch (error: any) {
          console.log(`Error processing item: ${item.id}`, error.message);
          return NextResponse.json(
            { message: `Error processing item: ${item.id}` },
            { status: 500 }
          );
        }
      })
    );
  } else {
    console.log(`Unhandled event type ${event?.type}.`);
    return NextResponse.json(
      { message: `Unhandled event type ${event?.type}.` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Event has been handled successfully" },
    { status: 200 }
  );
}
