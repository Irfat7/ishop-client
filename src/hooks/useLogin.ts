import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export const useLogin = () => {
    const auth = useFirebaseAuth()
    const { mutateAsync: login, isPending: isLoggingIn, error: loginError } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                return userCredential.user;
            } catch (error) {
                console.log(error);
            }
        }
    })

    return { login, isLoggingIn, loginError }
};