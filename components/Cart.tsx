"use client";
import { useCart, useIncrementOrDecrement } from "@/hooks/cart";
import React from "react";
import Checkout from "./Checkout";
import Image from "next/image";
import Link from "next/link";
import emptyCart from "@/assets/images/empty-cart.png";
import { CartProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import RemoveItemFromCart from "./RemoveItemFromCart";

function Cart({ cart }: { cart: CartProduct[] }) {
  const { data: productsInCart } = useCart(cart);

  const isEmpty = !productsInCart || productsInCart.length === 0;

  const incrementOrDecrementMutation = useIncrementOrDecrement();

  return (
    <>
      {isEmpty ? (
        <div className="h-[400px] grid place-content-center">
          <Image src={emptyCart} width="300" height="300" alt="empty cart" />
          <div className="text-center">
            <p className="mb-2">You don't have any items in your cart.</p>
            <Link href="/products" className="text-red-400">
              Explore our porducts
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/3 divide-y-[1px] divide-zinc-300 max-h-96 overflow-auto styled-scrollbar pe-3">
              {productsInCart.map((product: CartProduct) => (
                <div key={product.id} className="flex justify-between py-4">
                  <div className="flex">
                    <div className="rounded-md bg-zinc-100 me-3">
                      <Image
                        src={product.product.image}
                        height="100"
                        width="100"
                        alt="headphone"
                      />
                    </div>
                    <ul>
                      <li className="font-semibodl">{product.product.name}</li>
                      <li className="flex items-center">
                        <span className="me-2">Qty:</span>
                        <div className="flex items-center gap-2 ">
                          <button
                            onClick={() =>
                              incrementOrDecrementMutation.mutate({
                                productId: product.productId,
                                operation: "decrement",
                              })
                            }
                            className="active:scale-75 h-5 w-5 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-2 flex items-center justify-center">
                            {product.quantity}
                          </span>
                          <button
                            disabled={
                              product.quantity === product.product.stock
                            }
                            onClick={() =>
                              incrementOrDecrementMutation.mutate({
                                productId: product.productId,
                                operation: "increment",
                              })
                            }
                            className={`active:scale-75 h-5 w-5 flex items-center justify-center bg-black text-white rounded-full ${
                              product.quantity === product.product.stock
                                ? "bg-gray-300 hover:cursor-not-allowed"
                                : "bg-black hover:cursor-pointer"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    </ul>
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
              <Checkout cart={productsInCart} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
