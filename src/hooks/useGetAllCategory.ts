import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../lib/react-query/keys"
import axios from "axios"

export const useGetAllCategory = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_ALL_CATEGORY],
        queryFn: async () => {
            return axios.get('http://localhost:3001/categories')
        }
    })
}