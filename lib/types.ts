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