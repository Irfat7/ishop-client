import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useIdMap } from "./useIdMap";

export const useGetUsersCart = () => {
    const axiosSecure = useAxiosSecure()
    const [userId, userIdLoading] = useIdMap()

    const { data: carts=[], isLoading, error } = useQuery({
        queryKey: ["Cart", userId],
        queryFn: async () => {
            const response = await axiosSecure.get(`/carts/user?userId=${userId}`)
            return response.data
        },
        enabled: !userIdLoading && !!userId
    })
    return [carts, isLoading, error]
};