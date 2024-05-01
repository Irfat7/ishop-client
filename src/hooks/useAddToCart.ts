import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useAddToCart = () => {
    const axiosSecure = useAxiosSecure()

    const addToCart = async ({ uId, productId }: { uId: string, productId: string }) => {
        const { data } = await axiosSecure.get(`/users/id-map/getUser?firebaseId=${uId}`)
        const response = await axiosSecure.post('/carts/', {
            userId: data.id,
            productId,
            quantity: 1
        })
        return response.data
    }

    const { mutateAsync: addCart, isPending, isError, isSuccess, error } = useMutation({
        mutationFn: addToCart
    })
    return { addCart, isPending, isError, isSuccess, error }
};