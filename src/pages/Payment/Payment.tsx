/* import SectionHeader from '../../components/SectionHeader/SectionHeader';
import bdFlag from '/icons/bdFlag.svg' */
import { Appearance, StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import { useGetUsersCart } from '../../hooks/useGetUsersCart';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { useNavigate } from 'react-router-dom';
import { calculateTotal } from '../../Utils';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_TEST);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [carts, cartsLoading, cartsError] = useGetUsersCart()
    const axiosInstance = useAxiosSecure()
    const axiosErrorToast = useAxiosErrorToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (!cartsLoading) {
            carts.length === 0 && navigate('/')
            const totalPrice = calculateTotal(carts, [])
            axiosInstance.post('/create-payment-intent', { totalPrice })
                .then(({ data }) => setClientSecret(data.clientSecret))
                .catch(error => axiosErrorToast(error))
        }
        cartsError && axiosInstance(cartsError)
    }, [carts])

    const appearance: Appearance = {
        theme: 'stripe',
    };
    const options: StripeElementsOptions = {
        clientSecret,
        appearance,
    };

    return (
        <div className='w-full md:w-1/2 mx-auto'>
            {clientSecret && <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>}
        </div>
    );
};

export default Payment;