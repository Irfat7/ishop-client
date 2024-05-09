import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

interface IOrder {
    userId: string,
    paymentId: string,
    productInfo: {
        productId: string,
        quantity: number
    }[],
    carts: string[],
}

export const useCreateOrder = () => {
    const axiosInstance = useAxiosSecure()
    const {
        mutateAsync: createOrder,
        isPending: creatingOrder,
        error: orderCreationError
    } = useMutation({
        mutationFn: async ({ userId, paymentId, productInfo, carts }: IOrder) => {
            const response = await axiosInstance.post('orders', {
                userId,
                paymentId,
                productInfo,
                carts
            })
            return response.data
        }
    })
    return { createOrder, creatingOrder, orderCreationError }
};