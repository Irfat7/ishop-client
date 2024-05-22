import { useDeleteCoupons } from "../../hooks/useDeleteCoupons";
import { ICoupons } from "../../types";
import CouponDialog from "../AlertDialog/CouponDialog";
import { useEffect } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";

const tableHeaders = ['code', 'quantity', 'amount', 'Delete']

interface TableProps {
    coupons: ICoupons[],
    refetchCoupon: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>
}

const Table: React.FC<TableProps> = ({ coupons, refetchCoupon }) => {
    const axiosErrorToast = useAxiosErrorToast()
    const { deleteCoupon, deletingCoupon, deletingCouponError, deletingSuccess } = useDeleteCoupons()

    useEffect(() => {
        deletingSuccess && refetchCoupon()
        deletingCouponError && axiosErrorToast(deletingCouponError)
    }, [deletingCouponError, deletingSuccess])

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
                            <CouponDialog couponId={coupon._id} deleteCoupon={deleteCoupon} deletingCoupon={deletingCoupon} />
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
};

export default Table;