"use client"
import { useCart } from "@/hooks/cart";
import { CartProduct } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

function ShoppingCartButton({cart} : {cart: CartProduct[]}) {
  const { data } = useCart(cart);

  return (
    <div className="relative">
      <Link href="/cart" className="gap-2">
        <ShoppingCart />
      </Link>
      <span className="absolute flex justify-center items-center w-5 h-5 -top-2 -right-2 rounded-full bg-black text-white text-[0.8rem]">
        {data?.length} 
      </span>
    </div>
  );
}

export default ShoppingCartButton;
