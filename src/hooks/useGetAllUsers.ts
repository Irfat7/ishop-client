import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetAllUsers = () => {
    const axiosInstance = useAxiosSecure()
    const {
        data: allUsers,
        isFetching: loadingAllUser,
        error: allUserError,
        hasNextPage: hasMoreUser,
        fetchNextPage: getMoreUsers,
        isFetchingNextPage: fetchingMoreUsers
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.ALL_USERS],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/users?page=${pageParam}`)
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const limit = 3;
            if (lastPage.length < limit) {
                return undefined;
            }
            return allPages.length + 1;
        },
        refetchOnWindowFocus: false
    })
    return {
        allUsers, loadingAllUser, allUserError, hasMoreUser, getMoreUsers, fetchingMoreUsers
    }
};