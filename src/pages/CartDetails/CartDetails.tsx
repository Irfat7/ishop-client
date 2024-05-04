import SingleCart from "../../components/SingleCart/SingleCart";
import Loader from "../../components/universe/Loader/Loader";
import { useGetUsersCart } from "../../hooks/useGetUsersCart";
import { ICart } from "../../types";

const CartDetails = () => {
    const [carts, cartsLoading] = useGetUsersCart()

    if (cartsLoading) {
        return <Loader />
    }

    if (carts.length === 0 && !cartsLoading) {
        return <p className="text-center font-medium text-2xl">Cart is empty</p>
    }

    return (
        <section
            className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                    <div
                        className="col-span-12 xl:col-span-8 lg:pr-8 pb-8 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                            <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">3 Items</h2>
                        </div>
                        <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                            <div className="col-span-12 md:col-span-6">
                                <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="grid grid-cols-6">
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-gray-400 text-right">Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* product */}
                        {
                            carts.map((cartItem: ICart) => <SingleCart key={cartItem._id} imageUrl={cartItem.productId.imageUrl[0]} itemCategory={cartItem.productId.category.name} itemName={cartItem.productId.name} itemPrice={cartItem.productId.price} itemQuantity={cartItem.quantity} />)
                        }

                    </div>
                    <div
                        className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8">
                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary</h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">3 Items</p>
                                <p className="font-medium text-lg leading-8 text-black">$480.00</p>
                            </div>
                            <form>
                                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code
                                </label>
                                <div className="flex pb-4 w-full">
                                    <div className="relative w-full ">
                                        <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                                        </div>
                                        <input type="text"
                                            className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                                            placeholder="xxxx xxxx xxxx" />
                                        <button id="dropdown-button" data-target="dropdown"
                                            className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                                            type="button">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center border-b border-gray-200">
                                    <button
                                        className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Apply</button>
                                </div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="font-medium text-xl leading-8 text-black">3 Items</p>
                                    <p className="font-semibold text-xl leading-8 text-indigo-600">$485.00</p>
                                </div>
                                <button
                                    className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">Checkout</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CartDetails;