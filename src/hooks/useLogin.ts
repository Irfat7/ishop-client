import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useAuthContext } from "./useAuthContext";
import { useGenerateToken } from "./useGenerateToken";
import { useLogout } from "./useLogout";

export const useLogin = () => {
    const { generateToken, tokenError } = useGenerateToken()
    const { logOut } = useLogout()
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth()
    const { mutateAsync: login, isPending: isLoggingIn, error: loginError } = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            setUserCredentialLoading(true)
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const { token } = await generateToken(email)
                if (tokenError) {
                    await logOut()
                    throw new Error("token failed")
                }
                localStorage.setItem('access-token', token)
                return userCredential.user;
            } catch (error) {
                console.log(error);
            }
        }
    })

    return { login, isLoggingIn, loginError }
};