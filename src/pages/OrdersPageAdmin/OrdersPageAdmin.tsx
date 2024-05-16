import React, { FormEvent, useEffect } from 'react';
import { useGetAllOrders } from '../../hooks/useGetAllOrders';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import OrdersRow from '../../components/OrdersRow/OrdersRow';
import { IAdminOrder } from '../../types';
import { CircularProgress } from '@mui/material';
import { useSearchProductLastDigit } from '../../hooks/useSearchProductLastDigit';

const OrdersPageAdmin = () => {
    const { allOrders, loadingAllOrders, allOrdersError, hasMoreOrders, loadingMoreOrders, orderRefetching, sortOption, setSortOption, refetchAllOrders, fetchMoreOrder } = useGetAllOrders()
    const initialLoad = loadingAllOrders && !loadingMoreOrders
    const axiosErrorToast = useAxiosErrorToast()
    const { searchedOrder, searchingOrder, errorSearchingOrder, searchingSuccessful, setLastDigits } = useSearchProductLastDigit()

    useEffect(() => {
        refetchAllOrders()
    }, [sortOption])

    useEffect(() => {
        errorSearchingOrder && axiosErrorToast(errorSearchingOrder)
    }, [])

    const handleSortChange = (e: FormEvent) => {
        setSortOption((e.target as HTMLSelectElement).value)
    }

    const searchVisible = searchingSuccessful && searchedOrder.length

    const handleSearchLastDigit = async (event: FormEvent) => {
        event.preventDefault()
        const lastDigits = (event.target as HTMLFormElement).value
        if (lastDigits.length < 4) {
            return
        }
        setLastDigits(lastDigits)
    }

    if (!allOrders && !loadingAllOrders) {
        allOrdersError && axiosErrorToast(allOrdersError)
        return <ErrorMessage code={500} message='Something went wrong' />
    }

    const nothingFound = allOrders?.pages[0].length;
    const resultData = allOrders?.pages || [[]]

    if ((!nothingFound || !resultData) && !loadingAllOrders) {
        return (
            <>
                <SectionHeader title='All Orders' />
                {/* <div className='flex'>
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <form className="max-w-sm mb-4 ml-auto">
                        <label htmlFor="sortOptions" className="block mb-2 text-base">Sort Option</label>
                        <select onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5">
                            <option defaultValue='default'>Default</option>
                            <option value="ordered">Ordered</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </form>
                </div> */}
                <p className='text-center text-2xl font-medium'>{
                    !nothingFound ? "Sorry no orders found" : "Something went wrong"
                }</p>
            </>
        )
    }

    return (
        <div>
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
                    <select onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5">
                        <option defaultValue='default'>Default</option>
                        <option value="ordered">Ordered</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </form>
            </div>
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
                            searchingOrder ? <Loader /> :
                                searchVisible ?
                                    searchedOrder.map((order: IAdminOrder) => <OrdersRow key={order._id} order={order} />)
                                    :
                                    initialLoad || orderRefetching ? <Loader /> :
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
                !searchVisible && hasMoreOrders && <button
                    onClick={() => fetchMoreOrder()}
                    disabled={loadingMoreOrders}
                    className="center w-28 bg-dark-red p-2 rounded-md text-secondary mx-auto mt-5">
                    {loadingMoreOrders ?
                        <CircularProgress size={20} style={{ color: "white" }} /> : 'Load More'}
                </button>
            }
        </div>
    );
};

export default OrdersPageAdmin;