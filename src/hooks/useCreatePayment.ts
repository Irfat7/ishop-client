import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCreatePayment = () => {
    const axiosInstance = useAxiosSecure()
    const {
        mutateAsync: createPaymentRecord,
        error: paymentError
    } = useMutation({
        mutationFn: async ({ amount, userId }: { amount: string, userId: string }) => {
            const response = await axiosInstance.post('/payment/new-payment', { amount, userId })
            return response.data
        }
    })
    return { createPaymentRecord, paymentError }
};