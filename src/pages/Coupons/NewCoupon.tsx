import { useForm, SubmitHandler } from "react-hook-form"
import { useCreateCoupon } from '../../hooks/useCreateCoupon';
import { CircularProgress } from "@mui/material";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import toast from "react-hot-toast";
import React from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type CouponInputs = {
    code: string
    quantity: number
    amount: number
}

interface NewCouponProps {
    setNewCouponVisible: React.Dispatch<React.SetStateAction<boolean>>
    refetchCoupon: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<unknown, Error>>
}

const NewCoupon: React.FC<NewCouponProps> = ({ setNewCouponVisible, refetchCoupon }) => {
    const { createCoupon, creatingCoupon, creatingCouponError } = useCreateCoupon()
    const axiosErrorToast = useAxiosErrorToast()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CouponInputs>()

    const onSubmit: SubmitHandler<CouponInputs> = async (data) => {
        await createCoupon({ ...data })
        if (creatingCouponError) {
            return axiosErrorToast(creatingCouponError)
        }
        reset()
        refetchCoupon()
        setNewCouponVisible(prev => !prev)
        toast.success('New coupon created')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto py-5">
            <p className="text-dark-red font-medium text-xl mb-3 text-center">Create New Coupon</p>
            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="text"
                    {...register("code", {
                        required: "Coupon code is required",
                        minLength: {
                            value: 8,
                            message: "Minimum length of the coupon code is 8",
                        },
                        maxLength: {
                            value: 18,
                            message: "Maximum length of the coupon code is 18",
                        },
                    })}
                    id="code"
                    className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
                    placeholder=" "
                />
                <label
                    htmlFor="code"
                    className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                    Coupon Code
                </label>
                {errors.code && (
                    <p className="text-sm text-dark-red">*{errors.code.message}</p>
                )}
            </div>

            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="number"
                    {...register("quantity", {
                        required: "Coupon quantity is required",
                        min: {
                            value: 10,
                            message: "Minimum length of the coupon quantity is 10",
                        },
                        max: {
                            value: 100,
                            message: "Maximum length of the coupon quantity is 100",
                        },
                    })}
                    id="quantity"
                    className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
                    placeholder=" "
                />
                <label
                    htmlFor="quantity"
                    className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                    Coupon Quantity
                </label>
                {errors.quantity && (
                    <p className="text-sm text-dark-red">*{errors.quantity.message}</p>
                )}
            </div>

            <div className="group relative z-0 mb-5 w-full">
                <input
                    type="number"
                    {...register("amount", {
                        required: "Coupon amount is required",
                        min: {
                            value: 10,
                            message: "Minimum length of the coupon amount is 10",
                        },
                        max: {
                            value: 100,
                            message: "Maximum length of the coupon amount is 100",
                        },
                    })}
                    id="amount"
                    className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
                    placeholder=" "
                />
                <label
                    htmlFor="amount"
                    className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                    Coupon Amount
                </label>
                {errors.amount && (
                    <p className="text-sm text-dark-red">*{errors.amount.message}</p>
                )}
            </div>

            <button
                disabled={creatingCoupon}
                type="submit"
                className="center mt-4 w-full rounded-md bg-dark-red py-1 text-center font-normal text-secondary"
            >
                {
                    creatingCoupon ? <CircularProgress size={20} style={{ color: "white" }} /> : "Create"
                }
            </button>
        </form>
    );
};

export default NewCoupon;