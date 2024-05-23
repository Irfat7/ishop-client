import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCreateCoupon = () => {
    const axiosInstance = useAxiosSecure()

    const {
        mutateAsync: createCoupon,
        isPending: creatingCoupon,
        error: creatingCouponError
    } = useMutation({
        mutationFn: async ({ code, quantity, amount }: {
            code: string, quantity: number, amount: number
        }) => {
            const response = await axiosInstance.post('/coupons', {
                code,
                quantity,
                amount,
            })
            return response.data
        }
    })

    return {
        createCoupon, creatingCoupon, creatingCouponError
    }
};