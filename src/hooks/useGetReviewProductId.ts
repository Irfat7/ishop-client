import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetReviewProductId = (productId: string) => {
    const axiosInstance = useAxiosSecure()
    const {
        data: reviews = [],
        isPending: reviewsPending,
        error: reviewsError
    } = useQuery({
        queryKey: [QUERY_KEYS.REVIEW_PRODUCT, productId],
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