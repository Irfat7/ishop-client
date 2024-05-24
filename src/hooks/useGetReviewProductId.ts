import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetReviewProductId = (productId: string) => {
    const axiosInstance = useAxiosSecure()
    const {
        data: reviews = [],
        isPending: reviewsPending,
        error: reviewsError
    } = useQuery({
        queryKey: ['REVIEW_PRODUCT', productId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/reviews/byProduct/${productId}`)
            return response.data
        },
        enabled: !!productId
    })
    return {
        reviews, reviewsPending, reviewsError
    }
};