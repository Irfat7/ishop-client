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
            mutationFn: async ({ userId, message, starCount }: { userId: string, message: string, starCount:number }) => {
                const response = await axiosInstance.post('/overallReviews', { userId, message, starCount })
                return response.data
            }
        })

    return {
        postReview, postingReviews, errorPostingReview
    }
};