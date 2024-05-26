import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetReviewProductId = (productId: string) => {
    const {
        data: reviews,
        isPending: reviewsPending,
        error: reviewsError
    } = useQuery({
        queryKey: [QUERY_KEYS.REVIEW_PRODUCT, productId],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}reviews/byProduct/${productId}`)
            return response.data
        },
        enabled: !!productId
    })
    return {
        reviews, reviewsPending, reviewsError
    }
};