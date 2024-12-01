import {
  addItemToCart,
  getCart,
  incrementOrDecrementQuantity,
  removeItemFromCart,
} from "@/lib/cart-actions";
import { CartProduct } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useCart = (initialCartData: CartProduct[] | []) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    initialData: initialCartData,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: {
      productId: string;
      unitPrice: number;
      quantity: number;
    }) => addItemToCart(product),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product has been added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.message,
      });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>removeItemFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useIncrementOrDecrement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: { productId: string; operation: string }) =>
      incrementOrDecrementQuantity(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Faild to perfrom this action"
      })
    }
  });
};
