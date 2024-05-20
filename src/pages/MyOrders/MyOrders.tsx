import { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { useGetMyOrders } from '../../hooks/useGetMyOrders';
import { IOrder } from '../../types';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import NothingFound from '../shared/NothingFound';

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
                        <NothingFound message='Nothing Ordered' />
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