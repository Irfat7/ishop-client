import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetMostPopularProducts = () => {
    const {
        data: mostPopularProducts = [],
        error: mostPopularProductsError
    } = useQuery({
        queryKey: [QUERY_KEYS.MOST_POPULAR_PRODUCTS],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}orders/most-popular`)
            return response.data
        }
    })

    return {
        mostPopularProducts, mostPopularProductsError
    }
};