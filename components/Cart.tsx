"use client";
import { useCart } from "@/hooks/cart";
import React from "react";
import Checkout from "./Checkout";
import CartTable from "./CartTable";
import Image from "next/image";
import Link from "next/link";
import emptyCart from "@/assets/images/empty-cart.png";
import { CartProduct} from "@/lib/types";

function Cart({cart} : {cart: CartProduct[]}) {
  const { data: productsInCart } = useCart(cart);

  const isEmpty = !productsInCart || productsInCart.length === 0;
  
  return (
    <>
      {!isEmpty ? (
        <>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold">Cart</h2>
            <CartTable cart={productsInCart} />
          </div>
          {/* CHECKOUT INFO */}
          <Checkout cart={productsInCart}/>
        </>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
}

export default Cart;
