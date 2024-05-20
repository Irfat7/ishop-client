import { ReactElement, useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useGetSaleEvent } from '../../hooks/useGetSaleEvent';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import NothingFound from '../shared/NothingFound';
import CreateEvent from './CreateEvent';
import { useForm } from "react-hook-form"
import AllProductsTable from './AllProductsTable/AllProductsTable';
import { IProduct } from '../../types';
import toast from 'react-hot-toast';

type EventInputs = {
    eventName: string
    mainDiscount: number
    cheapDiscount: number
}

const SaleEvents = () => {
    const { event, eventLoading, eventError } = useGetSaleEvent();
    const axiosErrorToast = useAxiosErrorToast();
    const [current, setCurrent] = useState<number>(1)
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])

    const {
        register,
        handleSubmit,
        /* watch, */
        formState: { errors },
    } = useForm<EventInputs>()

    useEffect(() => {
        if (eventError) {
            axiosErrorToast(eventError);
        }
    }, [eventError, axiosErrorToast]);

    const noEvent = !eventLoading && event?.length === 0;

    const pageTitleMap: { [key: number]: string } = {
        1: "Sale Event",
        2: "Enter Event Description",
        3: "Select Products",
    };

    const pageShowMap: { [key: number]: ReactElement } = {
        1: <NothingFound message="No ongoing event. You can launch one." />,
        2: <CreateEvent register={register} errors={errors} />,
        3: <AllProductsTable selectedProducts={selectedProducts} setSelectedProduct={setSelectedProducts} />,
    };

    console.log(selectedProducts);

    const currentHandler = (prev = false) => {
        if (current === 3) {
            if (selectedProducts.length < 5) {
                return toast.error("Minimum product error")
            }
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
                        current === 3 ? 'Launch' : "Next"
                    }
                </button>
            </div>
            {noEvent && (
                <div className="overflow-hidden relative">
                    <div style={carouselStyle}>
                        {Object.keys(pageShowMap).map((key) => (
                            <div key={key} className="w-full flex-shrink-0">
                                {pageShowMap[Number(key)]}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SaleEvents;
