import { useRemoveFromCart } from "@/hooks/cart";
import { Trash2 } from "lucide-react";
import React from "react";

function RemoveItemFromCart({ productId }: { productId: string }) {
  const deleteProductMutation = useRemoveFromCart();
  return (
    <button
      className="inline-flex items-center gap-1"
      type="button"
      onClick={() => deleteProductMutation.mutate(productId)}
    >
      <Trash2 size={17} />
      Remove
    </button>
  );
}

export default RemoveItemFromCart;
