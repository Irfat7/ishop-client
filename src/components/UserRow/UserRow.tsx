import React from "react";
import { IUser } from "../../types";
import { calculateCreationDate } from "../../Utils";

interface UserRowProps {
    user: IUser
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    const { name, email, createdAt, role } = user
    const creationTime = calculateCreationDate(createdAt)
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
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
    );
};

export default UserRow;