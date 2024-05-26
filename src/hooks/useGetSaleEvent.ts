import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetSaleEvent = () => {
    const {
        data: event,
        isPending: eventLoading,
        error: eventError,
        refetch: refetchEvent,
        isRefetching: refetchingEvent
    } = useQuery({
        queryKey: [QUERY_KEYS.GET_SALE_EVENT],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}events`)
            return response.data
        }
    })
    return {
        event, eventLoading, eventError, refetchEvent, refetchingEvent
    }
};