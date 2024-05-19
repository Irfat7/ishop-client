import React, { FormEvent, useEffect, useState } from 'react';
import { useGetAllOrders } from '../../hooks/useGetAllOrders';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import OrdersRow from '../../components/OrdersRow/OrdersRow';
import { IAdminOrder } from '../../types';
import { CircularProgress } from '@mui/material';
import { useSearchProductLastDigit } from '../../hooks/useSearchProductLastDigit';
import NothingFound from '../shared/NothingFound';

const OrdersPageAdmin = () => {
    const { allOrders, loadingAllOrders, allOrdersError, hasMoreOrders, loadingMoreOrders, orderRefetching, sortOption, setSortOption, refetchAllOrders, fetchMoreOrder } = useGetAllOrders()
    const initialLoad = loadingAllOrders && !loadingMoreOrders
    const axiosErrorToast = useAxiosErrorToast()
    const [defaultSort, setDefaultSort] = useState('default')
    const { searchedOrder, searchingOrder, errorSearchingOrder, searchingSuccessful, setLastDigits, lastDigits } = useSearchProductLastDigit()

    const common = <>
        <SectionHeader title='All Orders' />
        <div className='flex gap-4 items-center mb-4'>
            <form className="flex-1">
                <label htmlFor="searchDigit" className="block mb-2 text-base">Search Using Last Digits(minimum 4)</label>
                <input
                    onChange={e => handleSearchLastDigit(e)}
                    className="border border-light-ash text-sm rounded-lg block w-full p-2.5"
                    type="text"
                    name="searchDigit"
                    id="searchDigit" />
            </form>
            <form className="flex-1">
                <label htmlFor="sortOptions" className="block mb-2 text-base">Sort Option</label>
                <select defaultValue={defaultSort} onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5">
                    <option>Default</option>
                    <option value="ordered">Ordered</option>
                    <option value="delivered">Delivered</option>
                </select>
            </form>
        </div>
    </>

    useEffect(() => {
        refetchAllOrders()
    }, [sortOption])

    useEffect(() => {
        errorSearchingOrder && axiosErrorToast(errorSearchingOrder)
    }, [])

    const handleSortChange = (e: FormEvent) => {
        const temp = (e.target as HTMLSelectElement).value
        setDefaultSort((e.target as HTMLSelectElement).value)
        setSortOption(temp)
    }

    const handleSearchLastDigit = async (event: FormEvent) => {
        event.preventDefault()
        const lastDigits = (event.target as HTMLFormElement).value
        if (lastDigits.length !== 0 && lastDigits.length < 4) {
            return
        }
        setLastDigits(lastDigits)
    }

    if (!allOrders && !loadingAllOrders) {
        allOrdersError && axiosErrorToast(allOrdersError)
        return <ErrorMessage code={500} message='Something went wrong' />
    }

    const searchVisible = searchingSuccessful && searchedOrder.length
    const noResultForSearch = searchingSuccessful && searchedOrder.length === 0 && lastDigits.length >= 4
    const nothingFound = allOrders?.pages[0].length;
    const resultData = allOrders?.pages || [[]]

    if ((!nothingFound || !resultData) && !loadingAllOrders) {
        return (
            <>
                {common}
                <NothingFound message='No orders found' />
            </>
        )
    }

    return (
        <div>
            {common}
            {
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
                            searchingOrder ?
                                <tr>
                                    <td colSpan={7} className='py-2'><Loader /></td>
                                </tr> :
                                noResultForSearch ? <tr>
                                    <td colSpan={7}>
                                        <NothingFound message='No orders found' />
                                    </td>
                                </tr> :
                                    searchVisible ?
                                        searchedOrder.map((order: IAdminOrder) => <OrdersRow key={order._id} order={order} />)
                                        :
                                        initialLoad || orderRefetching ? <tr><td colSpan={7} className='py-2'><Loader /></td></tr> :
                                            resultData.map((group, index) => (
                                                <React.Fragment key={index}>
                                                    {group.map((order: IAdminOrder) => <OrdersRow key={order._id} order={order} />)}
                                                </React.Fragment>
                                            ))
                        }
                    </tbody>
                </table>
            }

            {
                !searchVisible && hasMoreOrders && !initialLoad && !noResultForSearch && <button
                    onClick={() => fetchMoreOrder()}
                    disabled={loadingMoreOrders}
                    className="center w-28 bg-dark-red p-2 rounded-md text-secondary mx-auto mt-5">
                    {loadingMoreOrders ?
                        <CircularProgress size={20} style={{ color: "white" }} /> : 'Load More'}
                </button>
            }
        </div >
    );
};

export default OrdersPageAdmin;