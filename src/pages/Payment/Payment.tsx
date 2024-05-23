import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_TEST);

const Payment = () => {
    const { state } = useLocation()

    console.log(state);

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-full md:w-1/2 mx-auto'>
            <SectionHeader title='PAYMENT' />
            <Elements stripe={stripePromise}>
                <CheckoutForm coupon={state.coupon} />
            </Elements>
        </div>
    );
};

export default Payment;