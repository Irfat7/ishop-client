import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants";
import axios from "axios";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetOverallReview = () => {
    const {
        data: overallReviews = [],
    } = useQuery({
        queryKey: [QUERY_KEYS.OVERALL_REVIEW],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}overallReviews`)
            return response.data
        }
    })
    return {
        overallReviews
    }
};