import { useEffect, useState } from "react";
import SingleCart from "../../components/SingleCart/SingleCart";
import Loader from "../../components/universe/Loader/Loader";
import { useGetUsersCart } from "../../hooks/useGetUsersCart";
import { ICart } from "../../types";
import { useUpdateCart } from "../../hooks/useUpdateCart";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import toast from "react-hot-toast";
import { calculateTotal } from "../../Utils";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
    const navigate = useNavigate()
    const [carts, cartsLoading] = useGetUsersCart();
    const axiosErrorToast = useAxiosErrorToast();
    const [updateOperation, setUpdateOperation] = useState<
        { id: string; pId: string; quantity: number }[]
    >([]);
    const { updateCartQuantity, updatingQuantity, cartQuantityError } = useUpdateCart();
    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        cartQuantityError && axiosErrorToast(cartQuantityError);
    }, [cartQuantityError]);

    useEffect(() => {
        if (!cartsLoading && carts.length !== 0) {
            setTotalPrice(calculateTotal(carts, updateOperation))
        }
    }, [updateOperation, carts])

    if (cartsLoading) {
        return <Loader />;
    }

    if (carts.length === 0 && !cartsLoading) {
        return <p className="text-center text-2xl font-medium">Cart is empty</p>;
    }

    const checkoutHandler = async () => {
        if (updateOperation.length !== 0) {
            const response = await updateCartQuantity(updateOperation);
            response && toast.success("Cart updated");
            if (!response) {
                return;
            }
        }
        navigate('/payment')
    };

    return (
        <section className="after:contents-[''] after:bg-gray-50 relative z-10 after:absolute after:right-0 after:top-0 after:z-0 after:h-full xl:after:w-1/3">
            <div className="lg-6 relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 w-full pb-8 max-xl:mx-auto max-xl:max-w-3xl lg:pr-8 xl:col-span-8">
                        <div className="border-gray-300 flex items-center justify-between border-b pb-8">
                            <h2 className="font-manrope text-black text-3xl font-bold leading-10">
                                Shopping Cart
                            </h2>
                            <h2 className="font-manrope text-gray-600 text-xl font-bold leading-8">
                                3 Items
                            </h2>
                        </div>
                        <div className="border-gray-200 mt-8 grid grid-cols-12 border-b pb-6 max-md:hidden">
                            <div className="col-span-12 md:col-span-6">
                                <p className="text-gray-400 text-lg font-normal leading-8">
                                    Product Details
                                </p>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className="grid grid-cols-6">
                                    <div className="col-span-3">
                                        <p className="text-gray-400 text-center text-lg font-normal leading-8">
                                            Quantity
                                        </p>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-gray-400 text-right text-lg font-normal leading-8">
                                            Total
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* product */}
                        {carts.map((cartItem: ICart) => (
                            <SingleCart
                                key={cartItem._id}
                                cartItem={cartItem}
                                setUpdateOperation={setUpdateOperation}
                            />
                        ))}
                    </div>
                    <div className=" bg-gray-50 col-span-12 mx-auto w-full max-w-3xl max-xl:px-6 lg:pl-8 xl:col-span-4 xl:max-w-lg">
                        <h2 className="font-manrope text-black border-gray-300 border-b pb-8 text-3xl font-bold leading-10">
                            Order Summary
                        </h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="text-black text-lg font-normal leading-8">
                                    {carts.length} item(s)
                                </p>
                                <p className="text-black text-lg font-medium leading-8">
                                    ${totalPrice}
                                </p>
                            </div>
                            <div>
                                <label className="text-gray-400 mb-1.5 flex items-center text-sm font-medium">
                                    Promo Code
                                </label>
                                <div className="flex w-full pb-4">
                                    <div className="relative w-full ">
                                        <div className=" text-gray-300 absolute left-0 top-0 px-4 py-2.5"></div>
                                        <input
                                            type="text"
                                            className="shadow-xs text-gray-900 bg-white border-gray-300 placeholder-gray-500 focus:outline-gray-400 block h-11 w-full rounded-lg border py-2.5 pl-5 pr-11 text-base font-normal "
                                            placeholder="xxxx xxxx xxxx"
                                        />
                                        <button
                                            id="dropdown-button"
                                            data-target="dropdown"
                                            className="dropdown-toggle text-gray-900 absolute right-0 top-0 z-10 inline-flex flex-shrink-0 items-center bg-transparent px-4 py-4  pl-2 text-center text-base font-medium "
                                            type="button"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button className="bg-dark-red text-secondary w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold">
                                        Apply
                                    </button>
                                </div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="text-black text-xl font-medium leading-8">
                                        3 Items
                                    </p>
                                    <p className="text-indigo-600 text-xl font-semibold leading-8">
                                        $485.00
                                    </p>
                                </div>
                                <button
                                    disabled={updatingQuantity}
                                    onClick={checkoutHandler}
                                    className={`w-full rounded-xl bg-dark-red px-6 py-3 text-center text-lg font-semibold text-secondary ${updatingQuantity && 'cursor-not-allowed'}`}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartDetails;
