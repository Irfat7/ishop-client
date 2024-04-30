import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../lib/react-query/keys";
import axios from "axios";
import { baseUrl } from "../constants";

export const useGetOneCategory = (categoryName: string) => {
    const getProducts = async ({ pageParam = 1 }) => {
        const response = await axios.get(`${baseUrl}categories/${categoryName}?page=${pageParam}`)
        return response.data
    }
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_ONE_CATEGORY, categoryName],
        queryFn: getProducts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 3) {
                return undefined;
            }
            return allPages.length + 1;
        },
    })

    return {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    }
}