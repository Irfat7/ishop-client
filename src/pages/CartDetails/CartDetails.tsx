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
import NothingFound from "../shared/NothingFound";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useGetCouponByCode } from "../../hooks/useGetCouponByCode";
import { CircularProgress } from "@mui/material";

const CartDetails = () => {
    const navigate = useNavigate()
    const [carts, cartsLoading] = useGetUsersCart();
    const axiosErrorToast = useAxiosErrorToast();
    const [updateOperation, setUpdateOperation] = useState<
        { id: string; pId: string; quantity: number }[]
    >([]);
    const { updateCartQuantity, updatingQuantity, cartQuantityError } = useUpdateCart();
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const { coupon, couponError, loadingCoupon, setCouponCode } = useGetCouponByCode()

    useEffect(() => {
        cartQuantityError && axiosErrorToast(cartQuantityError);
    }, [cartQuantityError]);

    useEffect(() => {
        if (!cartsLoading && carts.length !== 0) {
            setTotalPrice(calculateTotal(carts, updateOperation))
        }
    }, [updateOperation, carts])

    useEffect(() => {
        couponError && axiosErrorToast(couponError)
    }, [couponError])

    const common = <SectionHeader title="My Cart" />

    if (cartsLoading) {
        return <>
            {common}
            <Loader />
        </>;
    }

    if (carts.length === 0 && !cartsLoading) {
        return <>
            {common}
            <NothingFound message="Cart is empty" />
        </>;
    }

    const checkoutHandler = async () => {
        if (updateOperation.length !== 0) {
            const response = await updateCartQuantity(updateOperation);
            response && toast.success("Cart updated");
            if (!response) {
                return;
            }
        }
        navigate(`/payment${coupon?.code ? `?code=${coupon?.code}` : ''}`, {
            state: {
                coupon: totalPrice < 400 ? undefined : coupon
            }
        })
    };

    let couponCodeInput = ''

    return (
        <section className="after:contents-[''] after:bg-gray-50 relative z-10 after:absolute after:right-0 after:top-0 after:z-0 after:h-full xl:after:w-1/3">
            {common}
            <div className="lg-6 relative z-10 mx-auto w-full max-w-7xl px-4 md:px-5">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 w-full pb-8 max-xl:mx-auto max-xl:max-w-3xl lg:pr-8 xl:col-span-8">
                        <div className="border-gray-300 flex items-center justify-between border-b pb-8">
                            <h2 className="font-manrope text-black text-3xl font-bold leading-10">
                                Shopping Cart
                            </h2>
                            <h2 className="font-manrope text-gray-600 text-xl font-bold leading-8">
                                {carts.length} item(s)
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
                                    Coupon Code
                                </label>
                                <div className="flex w-full pb-4">
                                    <div className="relative w-full ">
                                        <div className=" text-gray-300 absolute left-0 top-0 px-4 py-2.5"></div>
                                        <input
                                            disabled={totalPrice < 400 || loadingCoupon || coupon}
                                            onChange={e => couponCodeInput = e.target.value}
                                            type="text"
                                            className="shadow-xs text-gray-900 bg-white border-gray-300 placeholder-gray-500 focus:outline-gray-400 block h-11 w-full rounded-lg border py-2.5 pl-5 pr-11 text-base font-normal "
                                            placeholder={`${totalPrice < 400 ? 'Coupon not available for total price less than 400' : ''}`}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center mb-5">
                                    <button
                                        onClick={() => setCouponCode(couponCodeInput)}
                                        disabled={totalPrice < 400 || loadingCoupon || coupon}
                                        className={`bg-dark-red center text-secondary w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${loadingCoupon || totalPrice < 400 || coupon && 'cursor-not-allowed opacity-50'}`}>
                                        {
                                            loadingCoupon ? <CircularProgress size={20} style={{ color: "white" }} /> :
                                                coupon ? "Applied" : "Apply"
                                        }
                                    </button>
                                </div>
                                {
                                    coupon && totalPrice >= 400 &&
                                    <div className="flex items-center justify-between py-8">
                                        <p className="text-black text-xl font-medium leading-8">
                                            Discount Applied ${coupon.amount || 0}
                                        </p>
                                        <p className="text-indigo-600 text-xl font-semibold leading-8">
                                            Total ${totalPrice - coupon.amount || 0}
                                        </p>
                                    </div>
                                }
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
