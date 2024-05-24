import React, { ReactElement } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import LoadingFull from '../../components/LoadingFull/LoadingFull';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UsersOnly: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { user, isLoading } = useAuthContext()

    if (isLoading) {
        return <LoadingFull />
    }
    else if (user) {
        return children
    }

    toast.error('Please login',{id: 'pleaseLogIn'})
    return <Navigate to='/sign-in' replace={true} />
};

export default UsersOnly;