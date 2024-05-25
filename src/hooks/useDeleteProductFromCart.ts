import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useDeleteProductFromCart = () => {
    const axiosInstance = useAxiosSecure()
    const queryClient = useQueryClient()

    const {
        mutateAsync: deleteProduct,
        isPending: deletingProduct,
        error: deletingProductError,
    } = useMutation({
        mutationFn: async (cartId: string) => {
            const response = await axiosInstance.delete(`/carts/${cartId}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CART]
            })
        }
    })
    return {
        deleteProduct, deletingProduct, deletingProductError,
    }
};