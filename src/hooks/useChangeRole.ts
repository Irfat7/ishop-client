import { useMutation } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useChangeRole = () => {
    const axiosInstance = useAxiosSecure()
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
        }
    })
    return {
        changeRole, isChangingRole, changingRoleError
    }
};