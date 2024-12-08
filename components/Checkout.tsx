import React, { useState } from "react";
import { Button } from "./ui/button";
import { CartProduct } from "@/lib/types";
import { calculateTotal } from "@/utils/utils";
import { useRouter } from "next/navigation";

function Checkout({ cart }: { cart: CartProduct[] }) {
  const route = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    try {
      setIsPending(true);
      const res = await fetch(
        "http://localhost:3000/api/create-checkout-session",
        {
          method: "POST",
          body: JSON.stringify(cart),
        }
      );
      const { url } = await res.json();
      route.replace(url);
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="mt-7 md:mt-16 border border-gray-400 h-auto md:w-1/3 p-3 rounded-lg">
      <div className="border-b-[1px] py-5">
        <p className="text-gray-500">Order summary</p>
      </div>
      <div className="flex items-center justify-between my-5">
        <p>Grand total</p>
        <span className="font-bold">${calculateTotal(cart)}</span>
      </div>
      <Button onClick={handleClick} disabled={isPending} className="w-full py-6">
        {isPending ? "Processing..." : "Checkout now"}
      </Button>
    </div>
  );
}

export default Checkout;
