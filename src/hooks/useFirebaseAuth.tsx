import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const useFirebaseAuth = () => {
    return getAuth(app)
};