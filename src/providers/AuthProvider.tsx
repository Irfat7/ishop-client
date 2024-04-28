import React, { ReactElement, SetStateAction, createContext, useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.config";

type IAuthContext = {
    user: User | null,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContext | null>(null)
const auth = getAuth(app);

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                console.log('logged in', user);
            } else {
                console.log('logged out', user);
            }
            setIsLoading(false)
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        isLoading,
        setIsLoading,
    }

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;