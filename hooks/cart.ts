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
        onSuccess: ({ message }) => {
            toast({
                title: 'Success',
                description: message,
            })
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            })
        },
    })
}

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (productId: string) => removeProductFromCart(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            })
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            })
        },
    })
}

export const useDecrementQty = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (product: CartProduct) =>
            decrementQuantity(
                product.productId,
                product.cartId,
                product.quantity
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message,
            })
        },
    })
}
