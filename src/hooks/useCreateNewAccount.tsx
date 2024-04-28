import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "./useFirebaseAuth";


export const useCreateNewAccount = (email: string, password: string) => {
    const auth = useFirebaseAuth();
    const { mutateAsync: createNewAccount, isPending, isError } = useMutation({
        mutationFn: async () => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                return userCredential.user;
            } catch (error) {
                throw new Error()
            }
        }
    })
    return [createNewAccount, isPending, isError]
};