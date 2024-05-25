import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetCoupons = () => {
    const axiosInstance = useAxiosSecure()

    const {
        data: coupons = [],
        isPending: couponsLoading,
        error: couponsError,
        refetch: refetchCoupon,
        isRefetching: refetchingCoupon
    } = useQuery({
        queryKey: [QUERY_KEYS.DISCOUNT_COUPONS],
        queryFn: async () => {
            const response = await axiosInstance.get('/coupons')
            return response.data
        }
    })

    return {
        coupons, couponsLoading, couponsError, refetchCoupon, refetchingCoupon
    }
};