import { CartProduct, SingleProduct } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/services/stripeService";

export async function POST(req: NextRequest) {
  try {
    let session;
    const selectedProducts: SingleProduct | CartProduct[] = await req.json();

    const { userId } = await auth();

    if (!Array.isArray(selectedProducts)) {
      session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: selectedProducts.name,
                images: [selectedProducts.image],
                metadata: { product_id_db: selectedProducts.id, userId },
              },
              unit_amount: selectedProducts.unitPrice * 100, // Amount in cents
            },
            quantity: selectedProducts.quantity,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/`,
      });
      return NextResponse.json({ url: session.url });
    }

    session = await stripe.checkout.sessions.create({
      line_items: selectedProducts.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.product.name,
            images: [product.product.image],
            metadata: { product_id_db: product.productId, userId },
          },
          unit_amount: product.unitPrice * 100, // Amount in cents
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
