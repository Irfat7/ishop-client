import CartIcons from '/icons/cart.svg'
import { useGetUsersCart } from '../../hooks/useGetUsersCart';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';

const Cart = () => {
    const [carts, ,cartError] = useGetUsersCart()
    const axiosToast = useAxiosErrorToast()

    cartError && axiosToast(cartError)

    return (
        <div className='bg-secondary relative'>
            <img src={CartIcons} alt="Cart Icon" />
            <p className='absolute -right-3 -top-4 p-[2px] rounded-full base-regular bg-dark-red text-primary'>{carts.length}</p>
        </div>
    );
};

export default Cart;