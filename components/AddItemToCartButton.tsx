"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAddToCart } from "@/hooks/cart";

function AddItemToCartButton({
  productId,
  unitPrice,
  quantity = 1,
  className,
}: {
  productId: string;
  unitPrice: number;
  quantity?: number;
  className: string;
}) {
  const mutation = useAddToCart();

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() =>
        mutation.mutate({ productId, unitPrice, quantity })
      }
    >
      Add to Cart
    </Button>
  );
}

export default AddItemToCartButton;
