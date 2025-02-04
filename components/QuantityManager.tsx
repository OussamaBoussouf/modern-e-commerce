"use client";

import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import AddItemToCartButton from "./AddItemToCartButton";

function QuantityManager({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  if (product?.stock === 0) {
    return (
      <p className="text-red-600 font-bold mt-5">Currently Out Of Stock</p>
    );
  }

  return (
    <div>
      <div className="py-5">
        <div className="flex items-center gap-5 bg-white p-1 w-fit mb-4 rounded-full">
          <button
            className="active:scale-75 h-8 w-8 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer"
            onClick={() => setQuantity((prev) => prev - 1)}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="w-2 flex items-center justify-center">
            {quantity}
          </span>
          <button className="active:scale-75 h-8 w-8 flex items-center justify-center bg-black text-white rounded-full hover:cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <span>
          Only
          <span className="text-orange-400"> {product?.stock} Items</span> Left!
          Dont miss it
        </span>
      </div>
      <div className="flex items-center gap-5 mt-3 h-12">
        <Button className="basis-1/2 h-full">Buy Now</Button>
        <AddItemToCartButton
          productId={product.id}
          unitPrice={product.price}
          quantity={quantity}
          className="basis-1/2 h-full"
        />
      </div>
    </div>
  );
}

export default QuantityManager;
