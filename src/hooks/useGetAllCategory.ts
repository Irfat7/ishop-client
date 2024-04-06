import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/react-query/keys"
import axios from "axios"

export const useGetAllCategory = () => {
    const { data: categories = [], isPending, isError } = useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CATEGORY],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3001/categories')
            return response.data
            
        }
    })
    return [categories, isPending, isError]
}