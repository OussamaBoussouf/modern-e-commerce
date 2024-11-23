import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";

function CartTable() {
  const { basket, removeProduct, incrementProduct, decrementProduct } =
    useCart();


  return (
    <Table className="my-7 w-full">
      <TableHeader>
        <TableRow>
          <TableHead>PRODUCT</TableHead>
          <TableHead>QUANTITY</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead className="text-right">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {basket.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium w-1/4" >
              <Image
                src={product.image}
                width="80"
                height="80"
                alt={product.name}
                className="bg-gray-200 rounded-lg"
              />
            </TableCell>
            <TableCell className="w-1/4">
              <div className="inline-flex items-center border rounded-lg p-1 w-fit">
                <Button
                  className="w-1 h-6"
                  onClick={() => decrementProduct(product.id)}
                >
                  -
                </Button>
                <span className="w-6 flex items-center justify-center">
                  {product.quantity}
                </span>
                <Button
                  disabled={product.quantity === product.stock}
                  className="w-1 h-6"
                  onClick={() => incrementProduct(product.id)}
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell className="font-bold text-md w-1/4">
              ${formatPrice(product.price * product.quantity)}
            </TableCell>
            <TableCell className="text-right font-bold text-md w-1/4">
              <button
                className="inline-flex items-center gap-1"
                type="button"
                onClick={() => removeProduct(product.id)}
              >
                <Trash2 size={17} />
                Remove
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CartTable;
