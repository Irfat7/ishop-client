import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/react-query/keys"
import axios from "axios"

export const useGetProductById = (productId: string) => {
    const { data: product, isLoading, error } = useQuery({
        queryKey: [QUERY_KEYS.GET_ONE_PRODUCT, productId],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3001/products/${productId}`)
            console.log(response);
            return response.data;
        }
    })
    return [product, isLoading, error]
}