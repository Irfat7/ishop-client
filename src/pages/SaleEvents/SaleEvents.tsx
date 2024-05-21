import { ReactElement, useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetSaleEvent } from '../../hooks/useGetSaleEvent';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import NothingFound from '../shared/NothingFound';
import CreateEvent from './CreateEvent';
import { useForm } from "react-hook-form"
import AllProductsTable from './AllProductsTable/AllProductsTable';
import { IProduct } from '../../types';
import { useLaunchEvent } from '../../hooks/useLaunchEvent';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import Loader from '../../components/universe/Loader/Loader';
import EventCard from './EventCard/EventCard';

type EventInputs = {
    eventName: string
    mainDiscount: number
    cheapDiscount: number
}

const SaleEvents = () => {
    const { event, eventLoading, eventError, refetchEvent, refetchingEvent } = useGetSaleEvent();
    const axiosErrorToast = useAxiosErrorToast();
    const [current, setCurrent] = useState<number>(1)
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
    const { launchEvent, launchingEvent, launchingEventError } = useLaunchEvent()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EventInputs>()

    useEffect(() => {
        const error = eventError || launchingEventError
        if (error) {
            axiosErrorToast(error);
        }
    }, [eventError, axiosErrorToast, launchingEventError]);


    const pageTitleMap: { [key: number]: string } = {
        1: "Sale Event",
        2: "Enter Event Description",
        3: "Select Products",
    };

    if (eventLoading || refetchingEvent) {
        return <>
            <SectionHeader title={pageTitleMap[current] || 'Sale Event'} />
            <Loader />
        </>
    }

    const pageShowMap: { [key: number]: ReactElement } = {
        1: <NothingFound message="No ongoing event. You can launch one." />,
        2: <CreateEvent register={register} errors={errors} />,
        3: <AllProductsTable selectedProducts={selectedProducts} setSelectedProduct={setSelectedProducts} />,
    };

    const currentHandler = async (prev = false) => {
        if (current === 3 && selectedProducts.length >= 5) {
            const selectedProductsIds = selectedProducts.map(product => product._id)
            const eventInfo = {
                name: watch('eventName'),
                mainDiscount: watch('mainDiscount'),
                discountForCheapProducts: watch('cheapDiscount'),
                products: selectedProductsIds
            }
            const newEvent = await launchEvent(eventInfo)
            if (!newEvent) {
                return toast.error("Error creating event")
            }
            refetchEvent()
            toast.success('New event created')
        }
        if (prev) {
            setCurrent(prevCurrent => (prevCurrent > 1 ? prevCurrent - 1 : prevCurrent));
        } else {
            if (current === 2) {
                handleSubmit(() => {
                    setCurrent(prevCurrent => (prevCurrent < 3 ? prevCurrent + 1 : prevCurrent));
                })();

            } else {
                setCurrent(prevCurrent => (prevCurrent < 3 ? prevCurrent + 1 : prevCurrent));
            }
        }
    };

    const getTranslateValue = () => {
        return `translateX(-${(current - 1) * 100}%)`;
    };

    const carouselStyle = {
        display: 'flex',
        transition: 'transform 0.5s ease',
        transform: getTranslateValue(),
    };

    return (
        <div>
            <SectionHeader title={pageTitleMap[current] || 'Sale Event'} />
            {!event ? (
                <>
                    <div className="flex justify-between mb-4">
                        <button
                            onClick={() => currentHandler(true)}
                            disabled={current === 1}
                            className={`bg-dark-red text-secondary py-2 px-4 rounded ${current === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Prev
                        </button>
                        <button
                            onClick={() => currentHandler(false)}
                            disabled={current === 3 && selectedProducts.length < 5}
                            className={`bg-dark-red animate-bounce-once text-secondary py-2 px-4 rounded ${current === 3 && selectedProducts.length < 5 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {
                                launchingEvent ? <CircularProgress size={20} style={{ color: 'white' }} /> :
                                    current === 3 ? 'Launch' : "Next"
                            }
                        </button>
                    </div>
                    <div className="overflow-hidden relative">
                        <div style={carouselStyle}>
                            {Object.keys(pageShowMap).map((key) => (
                                <div key={key} className="w-full flex-shrink-0">
                                    {pageShowMap[Number(key)]}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : <EventCard event={event} refetchEvent={refetchEvent} setCurrent={setCurrent}/>
            }
        </div>
    );
};

export default SaleEvents;
