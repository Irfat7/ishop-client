import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useFirebaseAuth } from "./useFirebaseAuth";
import { useAddUserDB } from "./useAddUserDB";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { useGenerateToken } from "./useGenerateToken";

export const useCreateNewAccount = () => {
  const { generateToken, tokenError } = useGenerateToken();
  const navigate = useNavigate();
  const { setIsLoading: setUserCredentialLoading } = useAuthContext();
  const auth = useFirebaseAuth();
  const { mutateAsync: addUserDB, isError: isAddingUserDBFailed } =
    useAddUserDB();
  const {
    mutateAsync: createNewAccount,
    isPending: isNewAccountCreating,
    isError: isNewAccountCreatingError,
    isSuccess: accountCreated,
  } = useMutation({
    mutationFn: async ({
      email,
      password,
      displayName,
    }: {
      email: string;
      password: string;
      displayName: string;
    }) => {
      setUserCredentialLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName });
        const newUser = {
          firebaseId: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          imageUrl: "abc",
          role: "user",
        };
        const { token } = await generateToken(email);
        if (tokenError) {
          throw new Error("token failed");
        }
        localStorage.setItem("access-token", token);
        await addUserDB(newUser);
        if (isAddingUserDBFailed) {
          await deleteUser(user);
          throw new Error();
        }
        navigate("/sign-in");
        return userCredential.user;
      } catch (error) {
        throw new Error();
      }
    },
  });
  return {
    createNewAccount,
    isNewAccountCreating,
    isNewAccountCreatingError,
    accountCreated,
  };
};
