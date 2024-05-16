import React, { FormEvent, useEffect } from 'react';
import { useGetAllOrders } from '../../hooks/useGetAllOrders';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import OrdersRow from '../../components/OrdersRow/OrdersRow';
import { IAdminOrder } from '../../types';

const OrdersPageAdmin = () => {
    const { allOrders, loadingAllOrders, allOrdersError, hasMoreOrders, loadingMoreOrders, orderRefetching, sortOption, setSortOption, refetchAllOrders } = useGetAllOrders()
    const initialLoad = loadingAllOrders && !loadingMoreOrders
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        refetchAllOrders()
    }, [sortOption])

    const handleSortChange = (e: FormEvent) => {
        setSortOption((e.target as HTMLSelectElement).value)
    }

    if (!allOrders && !loadingAllOrders) {
        allOrdersError && axiosErrorToast(allOrdersError)
        return <ErrorMessage code={500} message='Something went wrong' />
    }

    const nothingFound = allOrders?.pages[0].length;
    const resultData = allOrders?.pages || [[]]

    if ((!nothingFound || !resultData) && !loadingAllOrders) {
        console.log(nothingFound);
        return (
            <>
                <SectionHeader title='All Orders' />
                <form className="max-w-sm mb-4 ml-auto">
                    <label htmlFor="sortOptions" className="block mb-2 text-base">Sort Option</label>
                    <select onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5">
                        <option defaultValue='default'>Default</option>
                        <option value="ordered">Ordered</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </form>
                <p className='text-center text-2xl font-medium'>{
                    !nothingFound ? "Sorry no orders found" : "Something went wrong"
                }</p>
            </>
        )
    }

    console.log(resultData);

    return (
        <div>
            <SectionHeader title='All Orders' />
            <form className="max-w-sm mb-4 ml-auto">
                <label htmlFor="sortOptions" className="block mb-2 text-base">Sort Option</label>
                <select onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5 outline-none focus:border-dark-red">
                    <option defaultValue='default'>Default</option>
                    <option value="ordered">Ordered</option>
                    <option value="delivered">Delivered</option>
                </select>
            </form>
            {
                initialLoad || orderRefetching ? <Loader /> :
                    <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-dark-red text-secondary">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Customer Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Products
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Payment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                resultData.map((group, index) => (
                                    <React.Fragment key={index}>
                                        {group.map((order: IAdminOrder) => <OrdersRow key={order._id} order={order} />)}
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
};

export default OrdersPageAdmin;