import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useUpdateCart = () => {
    const axiosInstance = useAxiosSecure()
    const { mutateAsync: updateCartQuantity, isSuccess: updatedQuantity, error: cartQuantityError } = useMutation({
        mutationFn: async (updateArray: { id: string, pId: string, quantity: number }[]) => {
            const response = await axiosInstance.patch('/carts/user', {
                updateArray
            })
            return response.data
        }
    })

    return { updateCartQuantity, updatedQuantity, cartQuantityError }
};