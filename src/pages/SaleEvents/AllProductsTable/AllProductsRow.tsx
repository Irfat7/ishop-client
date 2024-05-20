import React from 'react';
import { IProduct } from '../../../types';
import { Rating } from '@mui/material';

interface AllProductsRowProps {
    product: IProduct,
    selected: IProduct | undefined
    selectedProductHandler: (productToAdd: IProduct) => void
}

const AllProductsRow: React.FC<AllProductsRowProps> = ({ product, selected, selectedProductHandler }) => {
    const { name: productName, price, quantity, averageRating } = product
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
                <button className="bg-dark-red p-1 text-secondary rounded w-20" onClick={() => selectedProductHandler(product)}>
                    {
                        selected ? 'Remove' : 'Add'
                    }
                </button>
            </td>
        </tr>
    );
};

export default AllProductsRow;