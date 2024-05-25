import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const usePostOverallReview = () => {
    const axiosInstance = useAxiosSecure()

    const {
        mutateAsync: postReview,
        isPending: postingReviews,
        error: errorPostingReview
    }
        = useMutation({
            mutationFn: async ({ userId, message }: { userId: string, message: string }) => {
                const response = await axiosInstance.post('/overallReviews', { userId, message })
                return response.data
            }
        })

    return {
        postReview, postingReviews, errorPostingReview
    }
};