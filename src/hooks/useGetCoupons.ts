import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetCoupons = () => {
    const axiosInstance = useAxiosSecure()

    const {
        data: coupons = [],
        isPending: couponsLoading,
        error: couponsError,
    } = useQuery({
        queryKey: ['DISCOUNT_COUPONS'],
        queryFn: async () => {
            const response = await axiosInstance.get('/coupons')
            return response.data
        }
    })

    return {
        coupons, couponsLoading, couponsError
    }
};