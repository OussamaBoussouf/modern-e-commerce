export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  stock: number;
  subImages: { id: string; image: string; productId: string }[];
};

export type BasketProduct = Omit<
  Product,
  "subImages" | "description" | "rating"
> & {
  quantity: number;
};

export type CartProduct = {
  id: string;
  unitPrice: number;
  quantity: number;
  visitorId: string | null;
  productId: string;
  userId: string | null;
  product: Omit<Product, "subImages">;
};
