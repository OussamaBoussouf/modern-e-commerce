import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from './use-toast'
import {
  decrementQuantity,
  getProductsInCart,
  incrementQuantity,
} from '@/lib/actions/cart'
import { addProductToCart } from '@/lib/actions/cart'
import { removeProductFromCart } from '@/lib/actions/cart'
import { CartProduct } from '@/lib/types'

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getProductsInCart(),
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product: {
      productId: string
      unitPrice: number
      quantity: number
    }) => addProductToCart(product),
    onSuccess: (message) => {
      toast({
        title: message?.type == 'error' ? 'Error' : 'Success',
        variant: message?.type == 'error' ? 'destructive' : 'default',
        description: message?.message,
      })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (productId: string) => removeProductFromCart(productId),
    onSuccess: (message) => {
      if (message && message.type === 'error') {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: message.message,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useIncrementQty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      productId,
      cartId,
    }: {
      productId: string
      cartId: string
    }) => incrementQuantity(productId, cartId),
    onSuccess: (message) => {
      if (message && message.type === 'error') {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: message.message,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}

export const useDecrementQty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (product: CartProduct) =>
      decrementQuantity(product.productId, product.cartId, product.quantity),
    onSuccess: (message) => {
      if (message && message.type === 'error') {
        toast({
          title: 'Error',
          variant: 'destructive',
          description: message.message,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
}
