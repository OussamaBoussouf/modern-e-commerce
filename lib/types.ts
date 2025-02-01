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

export type CartProduct = {
  id: string;
  unitPrice: number;
  quantity: number;
  visitorId: string | null;
  userId: string | null;
  productId: string;
  product: Omit<Product, "subImages">;
};

export type SingleProduct = {
  quantity: number;
  unitPrice: number;
  name: string;
  id: string;
  image: string;
  stock: number
};
