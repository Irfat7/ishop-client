import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useState } from "react";

export const useSearchProductLastDigit = () => {
    const axiosSecure = useAxiosSecure()
    const [lastDigits, setLastDigits] = useState<string>('')
    const {
        data: searchedOrder = [],
        isPending: searchingOrder,
        error: errorSearchingOrder,
        isSuccess: searchingSuccessful
    } = useQuery({
        queryKey: ['SEARCH_ORDER', lastDigits],
        queryFn: async () => {
            if (!lastDigits) {
                return []
            }
            const response = await axiosSecure.get(`/orders/get/last-digit?lastDigits=${lastDigits}`)
            return response.data
        }
    })
    return {
        searchedOrder, searchingOrder, errorSearchingOrder, searchingSuccessful, setLastDigits
    }
};