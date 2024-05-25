import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useIdMap } from "./useIdMap";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetMyOrders = () => {
    const [userId = ''] = useIdMap()
    const axiosInstance = useAxiosSecure()

    const {
        data: getMyOrders = [],
        isLoading: myOrdersLoading,
        error: myOrdersError
    } = useQuery({
        queryKey: [QUERY_KEYS.MY_ORDERS, userId],
        queryFn: async () => {
            if (!userId) {
                return []
            }
            const response = await axiosInstance.get(`/orders/all/${userId}`)
            return response.data;
        },
    })
    return [getMyOrders, myOrdersLoading, myOrdersError]
};