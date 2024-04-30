import React, { ReactElement } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAdminVerify } from '../../hooks/useAdminVerify';
import { Navigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import LoadingFull from '../../components/LoadingFull/LoadingFull';

const AdminOnly: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { user, isLoading: isUserLoading } = useAuthContext()
    const { logOut } = useLogout()
    const [admin, isAdminLoading, adminError] = useAdminVerify(user?.email || '')

    if (isUserLoading || isAdminLoading) {
        return <LoadingFull />
    } else if (adminError) {
        setTimeout(() => {
            logOut()
        }, 0)
        return null;
    } else if (admin) {
        return children
    }
    setTimeout(() => {
        logOut()
    }, 0)
    return <Navigate to='/' replace={true} />
};

export default AdminOnly;