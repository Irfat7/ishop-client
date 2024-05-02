import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { useAxiosSecure } from "./useAxiosSecure";

export const useIdMap = () => {
    const { user } = useAuthContext()
    const axiosSecure = useAxiosSecure()
    const firebaseId = user?.uid
    const { data: userId, isLoading } = useQuery({
        queryKey: ['UID', firebaseId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/id-map/getUser?firebaseId=${firebaseId}`)
            return data.id
        },
        enabled: !!firebaseId
    })
    return [userId, isLoading]
};