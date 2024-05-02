import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useIdMap } from "./useIdMap";

export const useGetUsersCart = () => {
    const axiosSecure = useAxiosSecure()
    const [userId, userIdLoading] = useIdMap()

    const { data: carts = [], isLoading, error, refetch } = useQuery({
        queryKey: ["Cart", userId],
        queryFn: async () => {
            if (!userId) {
                return []
            }
            const response = await axiosSecure.get(`/carts/user?userId=${userId}`)
            return response.data
        },
    })
    return [carts, isLoading, error, refetch]
};