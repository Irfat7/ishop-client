import { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { useGetMyOrders } from '../../hooks/useGetMyOrders';
import { IOrder } from '../../types';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

const MyOrders = () => {
    const [myOrders, ordersLoading, orderError] = useGetMyOrders()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        orderError && axiosErrorToast(orderError)
    }, [orderError])

    return (
        <div>
            <SectionHeader title='My Orders' />
            {
                ordersLoading ?
                    <Loader />
                    :
                    myOrders.length === 0 ?
                        <p className="text-center text-xl md:text-2xl font-medium">Nothing Ordered</p>
                        :
                        <div className='space-y-5'>
                            {
                                myOrders.map((order: IOrder) => <OrderDetails key={order._id} order={order} />)
                            }
                        </div>
            }
        </div>
    );
};

export default MyOrders;