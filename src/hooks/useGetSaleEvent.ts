import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetSaleEvent = () => {
    const axiosInstance = useAxiosSecure()
    const {
        data: event,
        isPending: eventLoading,
        error: eventError
    } = useQuery({
        queryKey: ['GET_SALE_EVENT'],
        queryFn: async () => {
            const response = await axiosInstance.get('/events')
            return response.data
        }
    })
    return {
        event, eventLoading, eventError
    }
};