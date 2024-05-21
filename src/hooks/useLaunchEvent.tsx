import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useLaunchEvent = () => {
    const axiosInstance = useAxiosSecure()

    const {
        mutateAsync: launchEvent,
        isPending: launchingEvent,
        error: launchingEventError
    } = useMutation({
        mutationFn: async ({ name, products, mainDiscount, discountForCheapProducts }: {
            name: string,
            products: string[],
            mainDiscount: number,
            discountForCheapProducts: number
        }) => {
            const response = await axiosInstance.post('/events', {
                name,
                products,
                mainDiscount,
                discountForCheapProducts
            })
            return response.data
        }
    })
    return {
        launchEvent, launchingEvent, launchingEventError
    }
};