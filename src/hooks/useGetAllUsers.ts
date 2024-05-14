import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetAllUsers = () => {
    const axiosInstance = useAxiosSecure()
    const {
        data: allUsers = [],
        isFetching: loadingAllUser,
        error: allUserError,
        hasNextPage: hasMoreUser,
        fetchNextPage: getMoreUsers,
        isFetchingNextPage: fetchingMoreUsers
    } = useInfiniteQuery({
        queryKey: ['ALL_USERS'],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users`)
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
    })
    return {
        allUsers, loadingAllUser, allUserError, hasMoreUser, getMoreUsers, fetchingMoreUsers
    }
};