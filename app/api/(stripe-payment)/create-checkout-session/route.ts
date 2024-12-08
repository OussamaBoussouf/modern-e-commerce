import { CartProduct } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const product = await stripe.products.create({
      name: "Headphone",
      images: [
        "https://res.cloudinary.com/dcdra4coh/image/upload/v1731787301/Shure_SRH1540-2_qpqhzs.png",
      ],
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: 2000,
      currency: "usd",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "payment",
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/cart?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
