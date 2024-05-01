import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

export const useLogout = () => {
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth()
    const { mutateAsync: logOut, isPending: isLoggingOut, isError: loggingOutError } = useMutation({
        mutationFn: async () => {
            setUserCredentialLoading(true)
            try {
                await signOut(auth)
                toast.success("You have been logged out")
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "Failed logging out");
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        }
    })
    return { logOut, isLoggingOut, loggingOutError }
};