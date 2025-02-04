"use client";


import { Button } from "./ui/button";
import { useCheckout } from "@/hooks/useCheckout";

type BuyButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  
};

function BuyNowButton({ id, name, price, image, stock}: BuyButtonProps) {
 
  const product = {
    quantity: 1,
    unitPrice: price,
    name,
    id,
    image,
    stock
  };

  const { isPending, handleCheckout } = useCheckout(product);

  return (
    <Button
      className="flex-grow"
      disabled={isPending }
      onClick={() => handleCheckout()}
    >
      {isPending ? "Processing..." : "Buy Now"}
    </Button>
  );
}

export default BuyNowButton;
