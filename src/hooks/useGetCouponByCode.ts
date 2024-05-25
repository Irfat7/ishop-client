import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useState } from "react";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useGetCouponByCode = () => {
    const axiosInstance = useAxiosSecure()
    const [couponCode, setCouponCode] = useState<string>('')

    const { data: coupon,
        error: couponError,
        isLoading: loadingCoupon,
        refetch: refetchCoupon
    } = useQuery({
        queryKey: [QUERY_KEYS.COUPON, couponCode],
        queryFn: async () => {
            const response = await axiosInstance.get(`/coupons/${couponCode}`)
            return response.data
        },
        staleTime: 0,
        enabled: !!couponCode,
        retry: false
    }
    );

    return {
        coupon, couponError, loadingCoupon, refetchCoupon, couponCode, setCouponCode
    }
};