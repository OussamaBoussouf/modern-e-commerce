import { useIncrementOrDecrement } from "@/hooks/cart";
import { CartProduct } from "@/lib/types";
import React from "react";

function CartQuantityManager({ product} : {product: CartProduct}) {

  const incrementOrDecrementMutation = useIncrementOrDecrement();

  return (
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
            disabled={product.quantity === product.product.stock}
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
  );
}

export default CartQuantityManager;
