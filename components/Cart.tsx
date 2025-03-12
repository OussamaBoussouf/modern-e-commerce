"use client";
import { useCart} from "@/hooks/cart";
import React from "react";
import Checkout from "./Checkout";
import Image from "next/image";
import Link from "next/link";
import emptyCart from "@/assets/images/empty-cart.png";
import { CartProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import RemoveItemFromCart from "./RemoveItemFromCart";
import CartQuantityManager from "./cart/CartQuantityManager";


function Cart({ cart }: { cart: CartProduct[] }) {

  const { data } = useCart(cart);

  if (!data || data.products.length === 0) {
    return (
      <div className="h-[400px] grid place-content-center">
        <Image src={emptyCart} width="300" height="300" alt="empty cart" />
        <div className="text-center">
          <p className="mb-2">You don't have any items in your cart.</p>
          <Link href="/products" className="text-red-400">
            Explore our porducts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="md:w-2/3 divide-y-[1px] divide-zinc-300 max-h-96 overflow-auto styled-scrollbar pe-3">
        {data.products.map((product: CartProduct) => (
          <div key={product.productId} className="flex justify-between py-4">
            <div className="flex">
              <div className="rounded-md bg-zinc-100 me-3">
                <Image
                  src={product.product.image}
                  height="100"
                  width="100"
                  alt="headphone"
                />
              </div>
              <CartQuantityManager product={product}/>
            </div>
            <div className="flex flex-col items-end">
              <RemoveItemFromCart productId={product.productId} />
              <span className="mt-auto">
                ${formatPrice(product.quantity * product.unitPrice)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-1/3">
        <Checkout cart={data.products} />
      </div>
    </div>
  );
}

export default Cart;
