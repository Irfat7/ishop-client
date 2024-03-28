import CartIcons from '/icons/cart.svg'

const Cart = () => {
    return (
        <div className='bg-secondary relative'>
            <img src={CartIcons} alt="Cart Icon" />
            <p className='absolute -right-3 -top-4 h3-medium text-dark-red'>10</p>
        </div>
    );
};

export default Cart;