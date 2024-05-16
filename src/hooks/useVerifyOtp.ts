import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useVerifyOtp = () => {
    const axiosInstance = useAxiosSecure()
    const {
        mutateAsync: verifyOtp,
        isPending: verifyingOtp,
        error: verifyingOtpError,
        isSuccess: verifiedOtp
    } = useMutation({
        mutationFn: async ({ orderId, otp }: { orderId: string, otp: string }) => {
            const response = await axiosInstance.patch(`/orders/${orderId}`, { otp })
            return response.data
        }
    })
    return {
        verifyOtp, verifyingOtp, verifyingOtpError, verifiedOtp
    }
};