import { IAdminOrder } from "../../types";
import OtpAlertDialog from "../AlertDialog/OtpAlertDialog";
import OrderedProductsModal from "../OrderedProductsModal/OrderedProductsModal";

interface OrdersRowProps {
    order: IAdminOrder
}

const OrdersRow: React.FC<OrdersRowProps> = ({ order }) => {
    const { _id: orderId, customerName, address, payment, productInfo, status } = order
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
            <td className="px-6 py-4">
                {status}
            </td>
            <td className="px-6 py-4">
                {
                    status === 'ordered' && <OtpAlertDialog />
                }
            </td>
            <td className="px-6 py-4 capitalize">
                {address}
            </td>
        </tr>
    );
};

export default OrdersRow;