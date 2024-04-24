import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetOneCategory = (categoryName: string) => {
    const { data: products = [], isPending, isError } = useQuery({
        queryKey: [QUERY_KEYS.GET_ONE_CATEGORY, categoryName],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}categories/${categoryName}`)
            return response.data;
        }
    })
    return [products, isPending, isError]
};