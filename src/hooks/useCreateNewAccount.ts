import { createUserWithEmailAndPassword, updateProfile, deleteUser } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useAddUserDB } from "./useAddUserDB";
import { useAuthContext } from "./useAuthContext";
import { useGenerateToken } from "./useGenerateToken";


export const useCreateNewAccount = () => {
    const { generateToken, tokenError } = useGenerateToken()
    const { setIsLoading: setUserCredentialLoading } = useAuthContext()
    const auth = useFirebaseAuth();
    const { mutateAsync: addUserDB, isError: isAddingUserDBFailed } = useAddUserDB()
    const { mutateAsync: createNewAccount, isPending: isNewAccountCreating, isError: isNewAccountCreatingError } = useMutation({
        mutationFn: async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
            setUserCredentialLoading(true)
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user
                await updateProfile(user, { displayName })
                const newUser = {
                    name: user.displayName || '',
                    email: user.email || '',
                    imageUrl: 'abc',
                    role: "user"
                }
                await addUserDB(newUser)
                const { token } = await generateToken(newUser.email)
                if (isAddingUserDBFailed || tokenError) {
                    await deleteUser(user)
                    throw new Error()
                }
                localStorage.setItem('access-token', token)
                return userCredential.user;
            } catch (error) {
                throw new Error()
            }
        }
    })
    return { createNewAccount, isNewAccountCreating, isNewAccountCreatingError }
};