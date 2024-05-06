import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useUpdateCart = () => {
    const axiosInstance = useAxiosSecure()
    const { mutateAsync: updateCartQuantity, isPending: updatingCartQuantity, error: cartQuantityError } = useMutation({
        mutationFn: async (updateArray: { _id: string, quantity: number }[]) => {
            const response = await axiosInstance.patch('/carts/user', {
                updateArray
            })
            return response.data
        }
    })

    return [updateCartQuantity, updatingCartQuantity, cartQuantityError]
};