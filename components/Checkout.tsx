import React from "react";
import { Button } from "./ui/button";
import { CartProduct } from "@/lib/types";
import { calculateTotal } from "@/utils/utils";

function Checkout({ cart }: { cart: CartProduct[] }) {
  return (
    <div className="mt-7 md:mt-16 border border-gray-400 h-auto md:w-1/3 p-3 rounded-lg">
      <div className="border-b-[1px] py-5">
        <p className="text-gray-500">Order summary</p>
      </div>
      <div className="flex items-center justify-between my-5">
        <p>Grand total</p>
        <span className="font-bold">${calculateTotal(cart)}</span>
      </div>
      <Button className="w-full py-6">Checkout now</Button>
    </div>
  );
}

export default Checkout;
