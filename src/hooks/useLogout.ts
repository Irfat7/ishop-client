import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
    const auth = useFirebaseAuth()
    const { mutateAsync: logOut, isPending: isLoggingOut, isError: loggingOutError } = useMutation({
        mutationFn: async () => {
            try {
                await signOut(auth)
            } catch (error) {
                console.log(error);
            }
        }
    })
    return { logOut, isLoggingOut, loggingOutError }
};