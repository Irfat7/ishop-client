import { ICoupons } from "../../types";

const tableHeaders = ['code', 'quantity', 'amount', 'Delete']

interface TableProps {
    coupons: ICoupons[]
}

const Table: React.FC<TableProps> = ({ coupons }) => {

    return (
        <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-dark-red text-secondary">
                <tr>
                    {
                        tableHeaders.map(header => <th scope="col" className="px-6 py-3">
                            {header}
                        </th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    coupons.map(coupon => <tr key={coupon._id} className="even:bg-[#f2f2f2] border-b border-b-light-ash">
                        <td className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{coupon.code}</td>
                        <td className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{coupon.quantity}</td>
                        <td className="capitalize px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{coupon.amount}</td>
                        <td className="capitalize px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button
                                className="duration-200 border border-dark-red hover:bg-dark-red hover:text-secondary p-1 rounded-md min-w-fit">
                                Delete
                            </button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Table;