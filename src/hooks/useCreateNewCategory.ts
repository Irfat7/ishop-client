import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCreateNewCategory = () => {
    const axiosInstance = useAxiosSecure()
    const {
        mutateAsync: createCategory,
        isPending: isCreatingCategory,
        error: categoryCreationError
    } = useMutation({
        mutationFn: async ({ imageUrl, name }: { imageUrl: string, name: string }) => {
            const response = await axiosInstance.post('/categories', {
                imageUrl,
                name
            })
            return response.data
        }
    })
    return {
        createCategory, isCreatingCategory, categoryCreationError
    }
};