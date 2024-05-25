import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants";
import axios from "axios";

export const useGetOverallReview = () => {
    const {
        data: overallReviews = [],
    } = useQuery({
        queryKey: ["OVERALL_REVIEW"],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}overallReviews`)
            return response.data
        }
    })
    return {
        overallReviews
    }
};