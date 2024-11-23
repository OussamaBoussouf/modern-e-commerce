"use client";

import CartTable from "@/components/CartTable";
import emptyCart from "@/assets/images/empty-cart.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { calculateTotal } from "@/lib/utils";

function Cart() {
  const { basket } = useCart();

  return (
    <section className="container mx-auto py-10 px-3 md:flex md:items-start gap-8">
      <div className="md:w-2/3">
        {basket.length === 0 ? (
          <>
            <Image
              src={emptyCart}
              width="300"
              height="300"
              alt="empty cart"
              className="w-[300px] h-auto mx-auto"
            />
            <div className="text-center">
              <p className="text-lg">You don't have any items in your cart</p>
              <Link href="/products" className="text-red-500">
                explore products
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold">Cart</h2>
            <CartTable />
          </>
        )}
      </div>
      {/* CHECKOUT INFO */}
      <div className="mt-7 md:mt-0 border border-gray-400 h-auto md:w-1/3 p-3 rounded-lg">
        <div className="border-b-[1px] py-5">
          <p className="text-gray-500">Order summary</p>
        </div>
        <div className="flex items-center justify-between my-5">
          <p>Grand total</p>
          <span className="font-bold">${calculateTotal(basket)}</span>
        </div>
        <Button
          className="w-full py-6"
          disabled={basket.length === 0 ? true : false}
        >
          Checkout now
        </Button>
      </div>
    </section>
  );
}

export default Cart;
