import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useAuthContext } from "./useAuthContext";
import { useGenerateToken } from "./useGenerateToken";

export const useLogin = () => {
    const { generateToken, tokenError } = useGenerateToken()
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth()
    const { mutateAsync: login, isPending: isLoggingIn, error: loginError, isSuccess: loggedIn } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            setUserCredentialLoading(true)
            try {
                const { token } = await generateToken(email)
                if (tokenError) {
                    throw new Error("token failed")
                }
                localStorage.setItem('access-token', token)
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                return userCredential.user;
            } catch (error) {
                localStorage.removeItem('access-token')
                console.log(error);
            }
        }
    })

    return { login, isLoggingIn, loginError, loggedIn }
};