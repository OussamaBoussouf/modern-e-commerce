import { useRemoveFromCart } from "@/hooks/cart";
import { Trash } from "lucide-react";
import React from "react";

function RemoveItemFromCart({ productId }: { productId: string }) {
  const deleteProductMutation = useRemoveFromCart();
  return (
    <button
      onClick={() => deleteProductMutation.mutate(productId)}
      type="button"
      className="w-8 h-8 flex items-center justify-center  bg-zinc-200 hover:bg-red-500 hover:text-white rounded-full"
    >
      <Trash size="15" />
    </button>
  );
}

export default RemoveItemFromCart;
