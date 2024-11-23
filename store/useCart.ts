import { BasketProduct } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type StoreState = {
  basket: BasketProduct[] | [];
};

type StoreActions = {
  addToBasket: (productId: string, product: BasketProduct, toast: any) => void;
  removeProduct: (productId: string) => void;
  incrementProduct: (productId: string) => void;
  decrementProduct: (productId: string) => void;
};

type CartStore = StoreState & StoreActions;


//EXCEEDED THE STOCK LIMIT
const hasExceededStockLimit = (quantity: number, stock: number) => {
  return quantity > stock;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      basket: [],
      addToBasket: (productId: string, product: BasketProduct, toast: any) =>
        set((state) => {
          const newBasket = state.basket;
          console.log(productId);
          const selectedProduct = newBasket.find(element => element.id === productId);
          if (selectedProduct) {
            if (
              hasExceededStockLimit(
                product.quantity + selectedProduct.quantity,
                product.stock
              )
            ) {
              toast({
                variant: "warning",
                title: "Warning",
                description: "You cannot exceed the stock limit",
              });
              return {basket: newBasket};
            }

            selectedProduct.quantity += product.quantity;

            toast({
              variant: "success",
              title: "Success",
              description: "Product has been added successfully",
            });

            return {basket: newBasket};

          } else if (hasExceededStockLimit(product.quantity, product.stock)) {
            toast({
              variant: "warning",
              title: "Warning",
              description: "You cannot exceed the stock limit",
            });
            return {};
          }

          toast({
            variant: "success",
            title: "Success",
            description: "Product has been added successfully",
          });
          return { basket: [...state.basket, product] };
        }),
      removeProduct: (productId: string) =>
        set((state) => {
          const newBasket = state.basket.filter(product => product.id != productId) ;
          return { basket: newBasket };
        }),
      incrementProduct: (productId: string) =>
        set((state) => {
          const newBasket = state.basket;
          const selectedProduct = newBasket.find(element => element.id === productId);
          selectedProduct!.quantity += 1;
          return {basket: newBasket};
        }),
      decrementProduct: (productId: string) =>
        set((state) => {
          const newBasket = state.basket;
          const selectedProduct = newBasket.find(element => element.id === productId);
          if (selectedProduct && selectedProduct.quantity === 1) {
            const filteredBasket = newBasket.filter( element => element.id !== selectedProduct.id);
            return { basket: filteredBasket };
          }
          selectedProduct!.quantity -= 1;
          return { basket: newBasket };
        }),
    }),
    {
      name: "basket-sotrage",
    }
  )
);

// export const useCart = create<CartStore>()(
//   persist(
//     (set) => ({
//       basket: [],
//       addToBasket: (productId: string, product: BasketProduct, toast: any) =>
//         set((state) => {
//           const basketToMap = new Map<string, BasketProduct>(state.basket);
//           const selectedProduct = state.basket.find(element => element.id === productId);
//           if (selectedProduct) {
//             if (
//               hasExceededStockLimit(
//                 product.quantity + selectedProduct.quantity,
//                 product.stock
//               )
//             ) {
//               toast({
//                 variant: "warning",
//                 title: "Warning",
//                 description: "You cannot exceed the stock limit",
//               });
//               return {};
//             }

//             selectedProduct.quantity += product.quantity;

//             const quantity =
//               basketToMap.get(productId)!.quantity + product.quantity;
//             toast({
//               variant: "success",
//               title: "Success",
//               description: "Product has been added successfully",
//             });
//             basketToMap.set(productId, {
//               ...basketToMap.get(productId),
//               quantity,
//             });

//             return { basket: [...basketToMap] };
//           } else if (hasExceededStockLimit(product.quantity, product.stock)) {
//             toast({
//               variant: "warning",
//               title: "Warning",
//               description: "You cannot exceed the stock limit",
//             });
//             return {};
//           }

//           basketToMap.set(productId, product);
//           toast({
//             variant: "success",
//             title: "Success",
//             description: "Product has been added successfully",
//           });
//           return { basket: [...basketToMap] };
//         }),
//       removeProduct: (productId: string) =>
//         set((state) => {
//           const basketToMap = new Map<string, BasketProduct>(state.basket);
//           basketToMap.delete(productId);
//           return { basket: [...basketToMap] };
//         }),
//       incrementProduct: (productId: string) =>
//         set((state) => {
//           const basketToMap = new Map<string, BasketProduct>(state.basket);
//           const quantity = basketToMap.get(productId)!.quantity + 1;
//           basketToMap.set(productId, {
//             ...basketToMap.get(productId),
//             quantity,
//           });
//           return { basket: [...basketToMap] };
//         }),
//       decrementProduct: (productId: string) =>
//         set((state) => {
//           const basketToMap = new Map<string, BasketProduct>(state.basket);
//           if (basketToMap.get(productId)?.quantity === 1) {
//             basketToMap.delete(productId);
//             return { basket: [...basketToMap] };
//           }
//           const quantity = basketToMap.get(productId)!.quantity - 1;
//           basketToMap.set(productId, {
//             ...basketToMap.get(productId),
//             quantity,
//           });
//           return { basket: [...basketToMap] };
//         }),
//     }),
//     {
//       name: "basket-sotrage",
//     }
//   )
// );

//     set((state: any) => {
//       if (state.basket.has(product.id)) {
//         if (
//           hasExceededStockLimit(
//             product.quantity + state.basket.get(product.id).quantity,
//             product.stock
//           )
//         ) {
//           toast({
//             variant: "warning",
//             title: "Warning",
//             description: "You cannot exceed the stock limit",
//           });
//           return state;
//         }

//         const newBasket = new Map<string, BasketProduct>(state.basket);
//         const quantity = newBasket.get(product.id)?.quantity + product.quantity;
//         toast({
//           variant: "success",
//           title: "Success",
//           description: "Product has been added successfully",
//         });
//         newBasket.set(product.id, { ...newBasket.get(product.id), quantity });

//         return { basket: newBasket };
//       } else if (hasExceededStockLimit(product.quantity, product.stock)) {
//         toast({
//           variant: "warning",
//           title: "Warning",
//           description: "You cannot exceed the stock limit",
//         });
//         return state;
//       }

//       const newBasket = new Map(state.basket);
//       newBasket.set(product.id, product);
//       toast({
//         variant: "success",
//         title: "Success",
//         description: "Product has been added successfully",
//       });
//       return { basket: newBasket };
//     }),
//   removeProduct: (productId: string) =>
//     set((state: any) => {
//       const newBasket = new Map<string, BasketProduct>(state.basket);
//       console.log(newBasket, productId);
//       newBasket.delete(productId);
//       return { basket: newBasket };
//     }),
// }));
