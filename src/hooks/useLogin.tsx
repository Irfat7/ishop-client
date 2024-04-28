import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "./useFirebaseAuth";

export const useLogin = (email: string, password: string) => {
    const auth = useFirebaseAuth()
    useMutation({
        mutationFn: async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                return userCredential.user;
            } catch (error) {
                throw new Error()
            }
        }
    })
};