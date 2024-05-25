import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const usePostReview = () => {
    const axiosInstance = useAxiosSecure()
    const queryClient = useQueryClient()
    const {
        mutateAsync: postReview,
        isPending: postingReview,
        error: reviewError
    } = useMutation({
        mutationFn: async ({ orderId, userId, message, productId, starCount }: { orderId: string, userId: string, message: string, productId: string, starCount: number }) => {
            const response = await axiosInstance.post('/reviews', {
                orderId,
                userId,
                productId,
                starCount,
                message
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.MY_ORDERS]
            })
        }
    })
    return { postReview, postingReview, reviewError }
};