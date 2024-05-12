import { useQuery } from "@tanstack/react-query";
import { useIdMap } from "./useIdMap";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetMyReviews = () => {
    const [userId] = useIdMap()
    const axiosInstance = useAxiosSecure()
    const {
        data: myReviews = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["MY_REVIEWS", userId],
        queryFn: async () => {
            if (!userId) {
                return []
            }
            const response = await axiosInstance.get(`/reviews/byUser/${userId}`)
            return response.data
        }
    })
    return [myReviews, isLoading, error]
};