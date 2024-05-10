import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetMyOrders } from '../../hooks/useGetMyOrders';

const MyOrders = () => {
    const [myOrders, ordersLoading, orderError] = useGetMyOrders()
    console.log(myOrders);
    return (
        <div>
            <SectionHeader title='My Orders' />
        </div>
    );
};

export default MyOrders;