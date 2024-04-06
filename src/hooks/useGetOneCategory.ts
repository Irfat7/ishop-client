import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";

export const useGetOneCategory = (categoryName: string) => {
    const { data: products = [], isPending, isError } = useQuery({
        queryKey: [QUERY_KEYS.GET_ONE_CATEGORY, categoryName],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3001/categories/${categoryName}`)
            return response.data;
        }
    })
    return [products, isPending, isError]
};