import CartIcons from '/icons/cart.svg'

const Cart = () => {
    return (
        <div className='bg-secondary relative'>
            <img src={CartIcons} alt="Cart Icon" />
            <p className='absolute -right-3 -top-4 p-[2px] rounded-full base-regular bg-dark-red text-primary'>10</p>
        </div>
    );
};

export default Cart;