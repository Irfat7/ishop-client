import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { QUERY_KEYS } from "../lib/react-query/keys";

export const useChangeRole = () => {
    const axiosInstance = useAxiosSecure()
    const queryClient = useQueryClient()
    const {
        mutateAsync: changeRole,
        isPending: isChangingRole,
        error: changingRoleError,
    } = useMutation({
        mutationFn: async ({ userId, role }: { userId: string, role: string }) => {
            const response = await axiosInstance.patch('/users/change-role', {
                userId,
                role
            })
            return response.data
        },
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.ALL_USERS]
        })
    })
    return {
        changeRole, isChangingRole, changingRoleError
    }
};