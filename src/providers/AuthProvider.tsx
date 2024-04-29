import React, { ReactElement, SetStateAction, createContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

type IAuthContext = {
    user: User | null,
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

const initialContext = {
    user: null,
    isLoading: true,
    setIsLoading: () => { }
}

export const AuthContext = createContext<IAuthContext>(initialContext)

const AuthProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const auth = useFirebaseAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                console.log('logged in');
            } else {
                console.log('logged out');
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