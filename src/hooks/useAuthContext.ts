import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuthContext = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};
