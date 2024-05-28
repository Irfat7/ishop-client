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
import { ICart, ICoupons } from '../../types';
import { useCreatePayment } from '../../hooks/useCreatePayment';
import { useIdMap } from '../../hooks/useIdMap';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../lib/react-query/keys';

interface CheckoutFormProps {
    coupon: ICoupons | undefined
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ coupon }) => {
    const [address, setAddress] = useState<string>('')
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
    const { createPaymentRecord, creatingPayment, paymentError } = useCreatePayment()
    const [userId] = useIdMap()
    const { createOrder, creatingOrder, orderCreationError } = useCreateOrder()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!cartsLoading) {
            carts.length === 0 && navigate('/')
            const totalPrice = calculateTotal(carts, []) - (coupon?.amount || 0)
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
            coupon && axiosInstance.patch(`/coupons/use-coupon/${coupon.code}`)
            const cartItemIds = cartData.map(cartInformation => cartInformation._id)
            const productInfo = cartData.map(cartInformation => {
                return {
                    productId: cartInformation.productId._id,
                    quantity: cartInformation.quantity
                }
            })
            const newPayment = await createPaymentRecord({ amount: Math.floor(paymentIntent.amount / 100), userId })
            if (!newPayment) {
                paymentError && axiosErrorToast(paymentError)
                return
            }
            const newOrder = await createOrder({ userId: userId, paymentId: newPayment._id, productInfo, carts: cartItemIds, address })
            if (!newOrder) {
                orderCreationError && axiosErrorToast(orderCreationError)
            }
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.CART]
            })
            navigate('/payment-status')
        } else if (error) {
            console.log(error);
        }
    };

    const paymentDisabled = loading || !stripe || !elements || address.length < 10 || loading || creatingPayment || creatingOrder

    return (
        <form onSubmit={handleSubmit} className=''>
            <div className="card-element-container">
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium">Address</label>
                    <input
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        id="address"
                        className="block w-full p-4 border rounded-lg text-base"
                        placeholder='minimum length of 10' />
                </div>
                <CardElement />
            </div>
            <button
                className={`w-full rounded-xl bg-dark-red px-6 py-3 text-center text-lg font-semibold text-secondary ${paymentDisabled && 'cursor-not-allowed opacity-60'}`}
                disabled={paymentDisabled}>
                <span id="button-text">
                    {paymentDisabled ? <CircularProgress size={20} style={{ color: "white" }} /> : "Pay now"}
                </span>
            </button>
        </form>
    );
};
export default CheckoutForm;