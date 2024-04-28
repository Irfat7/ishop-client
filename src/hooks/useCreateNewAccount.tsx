import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";

const auth = getAuth(app);
export const useCreateNewAccount = (email: string, password: string) => {
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