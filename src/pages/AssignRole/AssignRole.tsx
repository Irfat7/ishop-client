import React, { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetAllUsers } from '../../hooks/useGetAllUsers';
import Loader from '../../components/universe/Loader/Loader';
import UserRow from '../../components/UserRow/UserRow';
import { IUser } from '../../types';
import { CircularProgress } from '@mui/material';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';

const AssignRole = () => {
    const {
        allUsers, loadingAllUser, allUserError, hasMoreUser, getMoreUsers, fetchingMoreUsers
    } = useGetAllUsers()
    const axiosErrorToast = useAxiosErrorToast()
    
    useEffect(() => {
        allUserError && axiosErrorToast(allUserError)
    }, [])
    
    const firstLoad = loadingAllUser && !fetchingMoreUsers
    return (
        <div className="">
            <SectionHeader title='User Data' />
            <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-dark-red text-secondary">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        firstLoad ? <tr><td colSpan={5} className='py-2'><Loader /></td></tr> :
                            allUsers && allUsers.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    {group.map((user: IUser) => (
                                        <UserRow user={user} />
                                    ))}
                                </React.Fragment>
                            ))
                    }
                </tbody>
            </table>
            {
                hasMoreUser && <button
                    onClick={() => getMoreUsers()}
                    disabled={fetchingMoreUsers}
                    className="center w-28 bg-dark-red p-2 rounded-md text-secondary mx-auto mt-5">
                    {fetchingMoreUsers ?
                        <CircularProgress size={20} style={{ color: "white" }} /> : 'Load More'}
                </button>
            }
        </div>

    );
};

export default AssignRole;