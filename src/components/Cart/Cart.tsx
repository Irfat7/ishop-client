import CartIcons from '/icons/cart.svg'
import { useGetUsersCart } from '../../hooks/useGetUsersCart';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

const Cart = () => {
    const [carts, , cartError, refetchCart] = useGetUsersCart()
    const axiosToast = useAxiosErrorToast()
    const { user } = useAuthContext()

    cartError && axiosToast(cartError)

    useEffect(() => {
        if (user) {
            refetchCart()
        }
    }, [user])

    return (
        <div className='bg-secondary relative'>
            <img src={CartIcons} alt="Cart Icon" />
            <p className='absolute -right-3 -top-4 p-[2px] rounded-full base-regular bg-dark-red text-primary'>{carts.length}</p>
        </div>
    );
};

export default Cart;