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
        <ShoppingCart size="20"/>
      </Link>
      <span className="absolute flex justify-center items-center w-4 h-4 -top-1 -right-2 rounded-full bg-black text-white text-[0.8rem]">
        {data?.length} 
      </span>
    </div>
  );
}

export default ShoppingCartButton;
