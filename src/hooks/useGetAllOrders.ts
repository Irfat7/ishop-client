import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetAllOrders = () => {
    const axiosInstance = useAxiosSecure()
    const [sortOption, setSortOption] = useState<string>('default')
    const { user } = useAuthContext()

    const {
        data: allOrders,
        isFetching: loadingAllOrders,
        error: allOrdersError,
        hasNextPage: hasMoreOrders,
        fetchNextPage: fetchMoreOrder,
        isFetchingNextPage: loadingMoreOrders,
        isRefetching: orderRefetching,
        refetch: refetchAllOrders
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.ALL_ORDERS, sortOption, user?.uid],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/orders/get-all?page=${pageParam}&sortOption=${sortOption}`)
            return response.data
        },
        initialPageParam: 0,
        getNextPageParam: (lastPages, allPages) => {
            const limit = 3
            if (lastPages.length < limit) {
                return undefined
            }
            return allPages.length + 1
        },
        refetchOnWindowFocus: false,
    })
    return {
        allOrders, loadingAllOrders, allOrdersError, hasMoreOrders, fetchMoreOrder, loadingMoreOrders, orderRefetching, sortOption, setSortOption, refetchAllOrders
    }
};