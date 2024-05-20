import React from 'react';
import { IProduct } from '../../../types';
import { Rating } from '@mui/material';

interface AllProductsRowProps {
    product: IProduct
}

const AllProductsRow: React.FC<AllProductsRowProps> = ({ product }) => {
    const { _id: productId, name: productName, price, quantity, averageRating } = product
    return (
        <tr className="even:bg-[#f2f2f2] border-b border-b-light-ash">
            <th scope="row" className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {productName}
            </th>
            <td className="px-6 py-4 lowercase">
                ${price}
            </td>
            <td className="px-6 py-4 capitalize">
                {quantity}
            </td>
            <td className="px-6 py-4">
                <Rating readOnly value={averageRating} />
            </td>
            <td className="px-6 py-4">
                {productId}
            </td>
        </tr>
    );
};

export default AllProductsRow;