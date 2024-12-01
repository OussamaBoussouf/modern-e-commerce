export async function getCart() {
  const res = await fetch("http://localhost:3000/api/cart");
  if (!res.ok) throw new Error("Something went wrong while fetching cart");
  return res.json();
}

export async function addItemToCart({
  productId,
  unitPrice,
  quantity,
}: {
  productId: string;
  unitPrice: number;
  quantity: number;
}) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: JSON.stringify({
      productId,
      unitPrice,
      quantity,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Faild to add item to cart");
  }
}

export async function removeItemFromCart(productId: string) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "DELETE",
    body: JSON.stringify({
      productId,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Faild to remove item from cart");
  }
}

export async function incrementOrDecrementQuantity({
  productId,
  operation,
}: {
  productId: string;
  operation: string;
}) {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "PUT",
    body: JSON.stringify({
      productId,
      operation,
    }),
  });

  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Faild to preform this action");
  }
}
