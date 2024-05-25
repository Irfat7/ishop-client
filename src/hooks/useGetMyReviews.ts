import { useQuery } from "@tanstack/react-query";
import { useIdMap } from "./useIdMap";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetMyReviews = () => {
    const [userId] = useIdMap()
    const axiosInstance = useAxiosSecure()
    const {
        data: myReviews = [],
        isLoading,
        error
    } = useQuery({
        queryKey: [QUERY_KEYS.MY_REVIEW, userId],
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