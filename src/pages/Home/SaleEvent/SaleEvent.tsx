import { useGetSaleEvent } from '../../../hooks/useGetSaleEvent';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import { IProduct } from '../../../types';
import ProductCard from '../../../components/nextui/ProductCard/ProductCard';
import { useEffect } from 'react';
import { useAxiosErrorToast } from '../../../hooks/useAxiosErrorToast';

const SaleEvent = () => {
    const { event, eventError } = useGetSaleEvent()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        eventError && axiosErrorToast(eventError)
    }, [eventError])
    
    return (
        <>
            {
                event &&
                <>
                    <SectionHeader title={event.name} />
                    <div className="grid gap-5 justify-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            event.products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)
                        }
                    </div>
                </>
            }
        </>
    );
};

export default SaleEvent;