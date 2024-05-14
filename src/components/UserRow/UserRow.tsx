import React, { useEffect } from "react";
import { IUser } from "../../types";
import { calculateCreationDate } from "../../Utils";
import { useAuthContext } from "../../hooks/useAuthContext";
import AlertDialog from "../AlertDialog/AlertDialog";
import { useChangeRole } from "../../hooks/useChangeRole";
import toast from "react-hot-toast";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";

interface UserRowProps {
    user: IUser
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    const { _id, name, email, createdAt, role } = user
    const creationTime = calculateCreationDate(createdAt)
    const { user: loggedInUser } = useAuthContext()
    const { changeRole, isChangingRole, changingRoleError } = useChangeRole()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        changingRoleError && axiosErrorToast(changingRoleError)
    }, [changingRoleError])

    const roleChangeHandler = async (role: string) => {
        const response = await changeRole({ userId: _id, role })
        if (!response) {
            return
        }
        toast.success(`${role} applied successfully`)
    }

    return (
        <tr className="even:bg-[#f2f2f2] border-b border-b-light-ash">
            <th scope="row" className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4 lowercase">
                {email}
            </td>
            <td className="px-6 py-4 capitalize">
                {role}
            </td>
            <td className="px-6 py-4">
                {creationTime}
            </td>
            <td className="px-6 py-4">
                {
                    loggedInUser && loggedInUser.email === email ? ''
                        : <AlertDialog
                            changingRoleError={changingRoleError}
                            isChangingRole={isChangingRole}
                            roleChangeHandler={roleChangeHandler}
                            name={name}
                            placeholder={role === 'admin' ? "Remove Admin" : "Assign Admin"}
                        />
                }
            </td>
        </tr>
    );
};

export default UserRow;