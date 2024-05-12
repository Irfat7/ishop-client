import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const usePostReview = () => {
    const axiosInstance = useAxiosSecure()
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
        }
    })
    return { postReview, postingReview, reviewError }
};