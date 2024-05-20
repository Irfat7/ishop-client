import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetSaleEvent } from '../../hooks/useGetSaleEvent';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import NothingFound from '../shared/NothingFound';
import CreateEvent from './CreateEvent';

const SaleEvents = () => {
    const { event, eventLoading, eventError } = useGetSaleEvent()
    const axiosErrorToast = useAxiosErrorToast()
    const [current, setCurrent] = useState<number>(1)
    const [pages, setPages] = useState(['eventHome', 'launch1', 'launch2'])

    useEffect(() => {
        eventError && axiosErrorToast(eventError)
    }, [])

    const noEvent = !eventLoading && event.length === 0

    const pageTitleMap: { [key: number]: string } = {
        1: "Sale Event",
        2: "Enter Event Description",
        3: "Select Products"
    }

    const currentHandler = (prev = true) => {
        prev && setCurrent(prev => prev > 1 ? prev - 1 : prev)
        !prev && setCurrent(prev => prev < 3 ? prev + 1 : prev)
    }

    return (
        <div>
            <SectionHeader title={pageTitleMap[current] || 'sale event'} />
            {
                !noEvent ? '' :
                    <div className='grid'>
                        <NothingFound message='No ongoing event. You can launch one.' />
                        <CreateEvent />
                        <ul className='bg-dark-red w-full h-96'>
                        </ul>
                        <div>
                            <button>Prev</button>
                            <button>Next</button>
                        </div>
                    </div>
            }
        </div >
    );
};

export default SaleEvents;