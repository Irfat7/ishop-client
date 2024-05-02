import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { useAxiosSecure } from "./useAxiosSecure";

export const useIdMap = () => {
    const { user } = useAuthContext()
    const axiosSecure = useAxiosSecure()

    const { data: userId, isLoading } = useQuery({
        queryKey: ['UID', user?.uid],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/id-map/getUser?firebaseId=${user?.uid}`)
            return response.data.id
        },
        enabled: !!user,
    })
    return [userId, isLoading]
};