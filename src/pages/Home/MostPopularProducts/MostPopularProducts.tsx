import { useEffect } from 'react';
import { useGetMostPopularProducts } from '../../../hooks/useGetMostPopularProducts';
import { useAxiosErrorToast } from '../../../hooks/useAxiosErrorToast';
import { IMostPopularProduct } from '../../../types';
import ProductCard from '../../../components/nextui/ProductCard/ProductCard';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';

const MostPopularProducts = () => {
    const axiosErrorToast = useAxiosErrorToast()
    const { mostPopularProducts, mostPopularProductsError } = useGetMostPopularProducts()
    useEffect(() => {
        mostPopularProductsError && axiosErrorToast(mostPopularProductsError)
    }, [mostPopularProductsError])

    console.log(mostPopularProducts);

    return (
        <>
        <SectionHeader title='our most popular products'/>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 justify-items-center gap-y-5'>
                {
                    mostPopularProducts.map((popularProduct: IMostPopularProduct) => <ProductCard key={popularProduct._id} product={popularProduct.product} />)
                }
            </div>
        </>
    );
};

export default MostPopularProducts;