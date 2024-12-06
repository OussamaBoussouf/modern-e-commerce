"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Button } from "./ui/button";
import { formatPrice } from "@/utils/utils";
import { CartProduct } from "@/lib/types";
import RemoveItemFromCart from "./RemoveItemFromCart";
import { useIncrementOrDecrement } from "@/hooks/cart";

function CartTable({ cart }: { cart: CartProduct[] }) {
  const incrementOrDecrementMutation = useIncrementOrDecrement();

  return (
    <Table className="my-7 w-full">
      <TableHeader>
        <TableRow>
          <TableHead>IMAGE</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>QUANTITY</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead className="text-right">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((product: CartProduct) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium w-1/4">
              <Image
                src={product.product.image}
                width="80"
                height="80"
                alt={product.product.name}
                className="bg-gray-200 rounded-lg"
              />
            </TableCell>
            <TableCell className="font-medium w-1/4">
              {product.product.name}
            </TableCell>
            <TableCell className="w-1/4">
              <div className="inline-flex items-center border rounded-lg p-1 w-fit">
                <Button
                  className="w-1 h-6"
                  onClick={() =>
                    incrementOrDecrementMutation.mutate({
                      productId: product.productId,
                      operation: "decrement",
                    })
                  }
                >
                  -
                </Button>
                <span className="w-6 flex items-center justify-center">
                  {product.quantity}
                </span>
                <Button
                  disabled={product.quantity === product.product.stock}
                  className="w-1 h-6"
                  onClick={() =>
                    incrementOrDecrementMutation.mutate({
                      productId: product.productId,
                      operation: "increment",
                    })
                  }
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell className="font-bold text-md w-1/4">
              ${formatPrice(product.quantity * product.unitPrice)}
            </TableCell>
            <TableCell className="text-right font-bold text-md w-1/4">
              <RemoveItemFromCart productId={product.productId} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CartTable;
