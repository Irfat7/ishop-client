import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import { useAxiosSecure } from "./useAxiosSecure";

export const useIdMap = () => {
    const { user } = useAuthContext()
    const axiosSecure = useAxiosSecure()

    const token = localStorage.getItem("access-token")
    const { data: userId, isLoading } = useQuery({
        queryKey: ['UID', user?.uid],
        queryFn: async () => {
            const response = await axiosSecure.get(`/users/id-map/getUser?firebaseId=${user?.uid}`)
            console.log('success', response.data.id)
            return response.data.id
        },
        enabled: !!user && !!token
    })
    return [userId, isLoading]
};