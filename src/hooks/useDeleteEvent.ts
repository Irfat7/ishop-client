import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useDeleteEvent = () => {
    const axiosInstance = useAxiosSecure()
    const {
        mutateAsync: closeEvent,
        isPending: closingEvent,
        error: eventCloseError
    } = useMutation({
        mutationFn: async (eventId: string) => {
            const response = await axiosInstance.delete(`/event/${eventId}`)
            return response.data
        }
    })
    return {
        closeEvent, closingEvent, eventCloseError
    }
};