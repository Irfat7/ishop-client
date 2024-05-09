import './checkoutForm.css'
import { FormEvent, useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { useGetUsersCart } from '../../hooks/useGetUsersCart';
import { useNavigate } from 'react-router-dom';
import { calculateTotal } from '../../Utils';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { CircularProgress } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ICart } from '../../types';


const CheckoutForm = () => {
    const { user } = useAuthContext()
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxiosSecure()
    const [carts, cartsLoading, cartsError] = useGetUsersCart()
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState<string>()
    const axiosErrorToast = useAxiosErrorToast()
    const [cartData, setCartData] = useState<ICart[]>([]);

    useEffect(() => {
        if (!cartsLoading) {
            carts.length === 0 && navigate('/')
            const totalPrice = calculateTotal(carts, [])
            axiosInstance.post('/create-payment-intent', { totalPrice, carts })
                .then(({ data }) => {
                    setClientSecret(data.clientSecret)
                    setCartData(carts)
                })
                .catch(error => axiosErrorToast(error))
        }
        cartsError && axiosInstance(cartsError)
    }, [carts])

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();

        if (!stripe || !clientSecret || !elements || !user) {
            return
        }

        setLoading(true);



        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            console.error("Card element not found");
            setLoading(false);
            return;
        }

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: user.email || 'email failed',
                },
            },
        });
        setLoading(false);
        if (paymentIntent) {
            const cartItemIds = cartData.map(cartInformation => cartInformation._id)
            console.log(cartItemIds);
            console.log('payment intent', paymentIntent);
        } else if (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=''>
            <div className="card-element-container">
                <CardElement />
            </div>
            <button className='w-full rounded-xl bg-dark-red px-6 py-3 text-center text-lg font-semibold text-secondary' disabled={loading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {loading ? <CircularProgress size={20} style={{ color: "white" }} /> : "Pay now"}
                </span>
            </button>
        </form>
    );
};
export default CheckoutForm;