import CartTable from "@/components/CartTable";
import emptyCart from "@/assets/images/empty-cart.png";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const isEmpty = false;

function Cart() {
  if (isEmpty) {
    return (
      <section className="container mx-auto py-16 px-3 text-center">
        <Image
          src={emptyCart}
          width="360"
          height="360"
          alt="empty cart"
          className="w-[360px] h-auto mx-auto"
        />
        <p className="text-lg">You don't have any items in your cart</p>
        <Link href="/products" className="text-red-500">explore products</Link> 
      </section>
    );
  }

  return (
    <section className="container mx-auto py-10 px-3 md:flex md:items-start gap-8">
      <div className="md:w-2/3">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Cart</h2>
          <button className="inline-flex items-center gap-1" type="button">
            <Trash2 size={17} />
            Remove
          </button>
        </div>
        <CartTable />
      </div>
      {/* CHECKOUT INFO */}
      <div className="border border-gray-400 h-auto md:w-1/3 p-3 rounded-lg space-y-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Subtotal</p>
          <span className="font-bold">$2,500.00</span>
        </div>
        <div className="flex items-center justify-between border-b-[1px] pb-4">
          <p className="text-gray-500">Discount</p>
          <span className="font-bold">$0</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Grand total</p>
          <span className="font-bold">$2,500.00</span>
        </div>
        <Button className="w-full py-6"> Checkout now</Button>
      </div>
    </section>
  );
}

export default Cart;
