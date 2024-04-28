import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export const useLogin = () => {
    const auth = useFirebaseAuth()
    const { mutateAsync: login, isPending: isLoggingIn, isError: isLoggingInError } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                return userCredential.user;
            } catch (error) {
                throw new Error()
            }
        }
    })

    return { login, isLoggingIn, isLoggingInError }
};