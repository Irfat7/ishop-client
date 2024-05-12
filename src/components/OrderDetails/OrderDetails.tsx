import React, { useState } from "react";
import { IOrder } from "../../types";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReviewModal from "../ReviewModal/ReviewModal";

interface OrderDetailsProps {
    order: IOrder
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    const { _id, status, paymentInfo, productDescription, productInfo, otp, userId } = order
    const [productVisible, setProductVisible] = useState<boolean>(false)

    const productWithReview = productDescription.map(prod => {
        for (const { productId, reviewed, quantity } of productInfo) {
            if (productId === prod._id) {
                return { ...prod, reviewed, quantity }
            }
        }
    })

    return (
        <div className="bg-primary py-5">
            <div className="grid grid-cols-4 bg-yellow pb-5 mb-5 border-b border-b-light-ash">
                <div className="flex justify-center items-center">
                    <div className="text-lg">
                        <p className="text-xl font-semibold">Order: {_id}</p>
                        <p className="">Delivery Status: {status === 'ordered' ? 'Processing' : 'Delivered'}</p>
                        {status === 'ordered' && <p className="">OTP: <span className="underline text-dark-red">{otp}</span></p>}
                        <p className="">Total Amount: {paymentInfo.amount}</p>
                    </div>
                </div>
                <div className="col-start-4 center">
                    <button
                        className={`transition-transform ${productVisible ? 'rotate-90' : 'rotate-0'}`}
                        onClick={() => setProductVisible(!productVisible)}>
                        <KeyboardArrowDownIcon />
                    </button>
                </div>
            </div>
            <div className={`transition-all origin-top ${productVisible ? "h-full scale-y-100" : "h-0 scale-y-0"}`}>
                <div className="grid grid-cols-4 col-span-4">
                    <p className="text-center px-6 py-3 text-lg font-medium">Image</p>
                    <p className="text-center px-6 py-3 text-lg font-medium">Name</p>
                    <p className="text-center px-6 py-3 text-lg font-medium">Quantity</p>
                    <p className="text-center px-6 py-3 text-lg font-medium">Review</p>
                </div>
                {
                    productWithReview.map(product => <div
                        key={product?._id}
                        className="h-20 grid grid-cols-4 mb-2">
                        <img className="h-20 w-full object-contain" src={product?.imageUrl[0]} />
                        <p className="center">{product?.name}</p>
                        <p className="center">{product?.quantity}</p>
                        {
                            product && !product.reviewed && status ==="delivered" ?
                                <button className="center">
                                    <ReviewModal reviewInfos={
                                        {
                                            id: product._id,
                                            productImage: product.imageUrl[0],
                                            userId,
                                            productName: product.name
                                        }
                                    } />
                                </button> : ''
                        }
                    </div>)
                }
            </div>
        </div >
    );
};

export default OrderDetails;