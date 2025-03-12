import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from './use-toast'
import { getProductsInCart } from '@/lib/actions/cart'
import { addProductToCart } from '@/lib/actions/cart'
import { removeProductFromCart } from '@/lib/actions/cart'
import { manageCartQuantity } from '@/lib/actions/cart'

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

export const useIncrementOrDecrement = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (product: { productId: string; operation: string }) =>
            manageCartQuantity(product),
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
