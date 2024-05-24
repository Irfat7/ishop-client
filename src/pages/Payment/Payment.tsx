import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCouponByCode } from '../../hooks/useGetCouponByCode';
import { useEffect } from 'react';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import Loader from '../../components/universe/Loader/Loader';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_TEST);

const Payment = () => {
    const { state } = useLocation()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    const axiosErrorToast = useAxiosErrorToast()
    const { coupon, couponError, loadingCoupon, setCouponCode } = useGetCouponByCode()
    const navigate = useNavigate()

    useEffect(() => {
        code && setCouponCode(code)
        couponError && axiosErrorToast(couponError)
        couponError && navigate('/')
    }, [couponError])

    if (loadingCoupon) {
        return <Loader />
    }

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-full md:w-1/2 mx-auto'>
            <SectionHeader title='PAYMENT' />
            <Elements stripe={stripePromise}>
                <CheckoutForm coupon={state?.coupon || coupon || undefined} />
            </Elements>
        </div>
    );
};

export default Payment;