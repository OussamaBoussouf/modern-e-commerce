"use client";

import { ReactNode, useCallback, useState } from "react";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

function StripeCheckoutProvider() {
  const fetchClientSecret = async () => {
    const response = await fetch(
      "http://localhost:3000/api/create-checkout-session",
      { method: "POST" }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const options = { fetchClientSecret };

  console.log(options);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default StripeCheckoutProvider;
