import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useDeleteCoupons = () => {
    const axiosInstance = useAxiosSecure()

    const {
        mutateAsync: deleteCoupon,
        isPending: deletingCoupon,
        error: deletingCouponError,
        isSuccess: deletingSuccess
    } = useMutation({
        mutationFn: async (couponId: string) => {
            const response = await axiosInstance.delete(`/coupons/${couponId}`)
            return response.data
        }
    })
    return {
        deleteCoupon, deletingCoupon, deletingCouponError, deletingSuccess
    }
};