import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { products } from "@/db/products";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

function CartTable() {
  return (
    <Table className="my-7">
      <TableHeader>
        <TableRow>
          <TableHead>PRODUCT</TableHead>
          <TableHead>QUANTITY</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead className="text-right">ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.slice(0, 4).map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              <Image
                src={product.image}
                width="80"
                height="80"
                alt={product.name}
                className="bg-gray-200 rounded-lg"
              />
            </TableCell>
            <TableCell>
              <div className="inline-flex items-center border rounded-lg p-1 w-fit">
                <Button className="w-1 h-6">-</Button>
                <span className="w-6 flex items-center justify-center">1</span>
                <Button className="w-1 h-6">+</Button>
              </div>
            </TableCell>
            <TableCell className="font-bold text-md">
              ${product.price}
            </TableCell>
            <TableCell className="text-right font-bold text-md">
              <button className="inline-flex items-center gap-1" type="button">
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
