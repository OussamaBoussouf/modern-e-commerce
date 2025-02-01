"use client";

import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import AddItemToCartButton from "./AddItemToCartButton";

function QuantityManager({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  if (product?.stock === 0) {
    return (
      <div className="text-center p-3 lg:p-5 border-[4px] border-black rounded-lg mt-8">
        <span className="font-bold text-lg lg:text-xl">Sorry this product is out of stock</span>
      </div>
    );
  }

  return (
    <div>
      <div className="py-5">
        <div className="flex items-center gap-5 bg-gray-100 rounded-md p-1 w-fit mb-4">
          <Button
            onClick={() => setQuantity((prev) => prev - 1)}
            disabled={quantity === 1}
          >
            -
          </Button>
          <span className="w-2 flex items-center justify-center">
            {quantity}
          </span>
          <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
        </div>
        <span>
          Only
          <span className="text-orange-400">{product?.stock} Items</span> Left!
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
