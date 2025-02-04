"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAddToCart } from "@/hooks/cart";
import { Loader } from "lucide-react";

function AddItemToCartButton({
  isDisabled,
  productId,
  unitPrice,
  quantity = 1,
  className,
}: {
  isDisabled?: boolean;
  productId: string;
  unitPrice: number;
  quantity?: number;
  className: string;
}) {
  
  const mutation = useAddToCart();

  return (
    <Button
      disabled={mutation.isPending || isDisabled}
      variant="outline"
      className={className}
      onClick={() =>
        mutation.mutate({ productId, unitPrice, quantity })
      }
    >
      {mutation.isPending ? <Loader className="animate-spin" /> : "Add to Cart"}
    </Button>
  );
}

export default AddItemToCartButton;
