declare global {
  interface CustomJwtSessionClaims {
    userMetaData : {cartId: string}
  }
}

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
  cartId: string;
  unitPrice: number;
  quantity: number;
  productId: string;
};

export type SingleProduct = {
  quantity: number;
  unitPrice: number;
  name: string;
  id: string;
  image: string;
  stock: number
};
