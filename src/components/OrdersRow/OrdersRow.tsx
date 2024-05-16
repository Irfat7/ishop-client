import { useEffect } from "react";
import { useVerifyOtp } from "../../hooks/useVerifyOtp";
import { IAdminOrder } from "../../types";
import OtpAlertDialog from "../AlertDialog/OtpAlertDialog";
import OrderedProductsModal from "../OrderedProductsModal/OrderedProductsModal";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import toast from "react-hot-toast";

interface OrdersRowProps {
    order: IAdminOrder
}

const OrdersRow: React.FC<OrdersRowProps> = ({ order }) => {
    const { _id: orderId, customerName, address, payment, productInfo, status } = order
    const { verifyOtp, verifyingOtp, verifyingOtpError, verifiedOtp } = useVerifyOtp()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        verifiedOtp && toast.success("Order Delivered")
        verifyingOtpError && axiosErrorToast(verifyingOtpError)
    }, [verifyingOtpError, verifiedOtp])

    return (
        <tr className="even:bg-[#f2f2f2] border-b border-b-light-ash">
            <td className="px-6 py-4 lowercase">
                {orderId}
            </td>
            <td className="px-6 py-4 capitalize">
                {customerName}
            </td>
            <td className="px-6 py-4 capitalize">
                <OrderedProductsModal productInfo={productInfo} />
            </td>
            <td className="px-6 py-4">
                {payment}
            </td>
            <td className="px-6 py-4 capitalize">
                {
                    verifiedOtp ? 'Delivered' : status
                }
            </td>
            <td className="px-6 py-4">
                {
                    (status === 'ordered' && !verifiedOtp) && <OtpAlertDialog verifyOtp={verifyOtp} orderId={orderId} verifyingOtp={verifyingOtp} />
                }
            </td>
            <td className="px-6 py-4 capitalize">
                {address}
            </td>
        </tr>
    );
};

export default OrdersRow;