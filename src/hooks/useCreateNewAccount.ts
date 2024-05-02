import { createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useAddUserDB } from "./useAddUserDB";
import { useAuthContext } from "./useAuthContext";


export const useCreateNewAccount = () => {
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth();
    const { mutateAsync: addUserDB, isError: isAddingUserDBFailed } = useAddUserDB()
    const { mutateAsync: createNewAccount, isPending: isNewAccountCreating, isError: isNewAccountCreatingError, isSuccess: accountCreated } = useMutation({
        mutationFn: async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
            setUserCredentialLoading(true)
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user
                await updateProfile(user, { displayName })
                const newUser = {
                    firebaseId: user.uid,
                    name: user.displayName || '',
                    email: user.email || '',
                    imageUrl: 'abc',
                    role: "user"
                }
                await addUserDB(newUser)
                if (isAddingUserDBFailed) {
                    await deleteUser(user)
                    throw new Error()
                }
                return userCredential.user;
            } catch (error) {
                throw new Error()
            }
        }
    })
    return { createNewAccount, isNewAccountCreating, isNewAccountCreatingError, accountCreated }
};