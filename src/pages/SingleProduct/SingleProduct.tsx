import { Link, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useGetProductById } from '../../hooks/useGetProductById';
import Loader from '../../components/universe/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { IProduct } from '../../types';
import { Rating } from '@mui/material';
import UpdateProductModal from '../../components/nextui/UpdateProductModal/UpdateProductModal';

const SingleProduct = () => {
    const { productId } = useParams()
    const [product, isProductInfoLoading, errorInfo] = useGetProductById(productId || "")
    if (isProductInfoLoading) {
        return <Loader />
    }
    if (errorInfo) {
        return <ErrorMessage code={errorInfo.response?.status} message={errorInfo.response.data.message} />
    }
    const typedProduct = product as IProduct;
    return (
        <div className='md:w-3/4 mx-auto md:flex gap-4'>
            <Carousel  className="md:w-1/3">
                {
                    typedProduct.imageUrl.map((url, index) =>
                        <div key={index}>
                            <img className='w-full h-52 object-contain' src={url} />
                        </div>)
                }
            </Carousel>
            <div className='space-y-2 mb-4'>
                <p className='text-3xl uppercase'>{typedProduct.name}</p>
                <div className='flex'>
                    <Rating size='medium' name="half-rating-read" defaultValue={typedProduct.averageRating} precision={0.1} readOnly />
                    <span className='opacity-70'>({typedProduct.reviews.length} ratings)</span>
                </div>
                <hr className='opacity-20' />
                <p className='text-dark-red text-2xl font-bold'>${typedProduct.price}</p>
                <ul className='pl-4'>
                    {
                        typedProduct.features.map((feature, index) => <li className='list-disc' key={index}>{feature}</li>)
                    }
                </ul>
                <div>
                    <Link
                        className='text-lg px-4 py-1 rounded-md capitalize bg-dark-red text-secondary'
                        to={`/${typedProduct.category.name}`}>
                        {typedProduct.category.name}
                    </Link>
                </div>
            </div>
            <UpdateProductModal {...typedProduct} />
        </div>
    );
};

export default SingleProduct;