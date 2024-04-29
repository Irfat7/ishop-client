import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth()
    const { mutateAsync: logOut, isPending: isLoggingOut, isError: loggingOutError } = useMutation({
        mutationFn: async () => {
            setUserCredentialLoading(true)
            try {
                await signOut(auth)
            } catch (error) {
                console.log(error);
            }
        }
    })
    return { logOut, isLoggingOut, loggingOutError }
};