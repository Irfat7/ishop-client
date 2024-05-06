import { SetStateAction, useState } from "react";
import { ICart } from "../../types";
import toast from "react-hot-toast";

interface CartProps {
    cartItem: ICart
    setUpdateOperation: React.Dispatch<SetStateAction<{ id: string, quantity: number }[]>>
}

const SingleCart: React.FC<CartProps> = ({ cartItem, setUpdateOperation }) => {
    const { productId, quantity: itemQuantity, _id } = cartItem
    const { imageUrl, name: itemName, category, price: itemPrice } = productId

    const [finalQuantity, setFinalQuantity] = useState<number>(itemQuantity)

    const changeQuantity = (reduce: boolean = true) => {
        if (reduce && finalQuantity <= 1) {
            return toast.error("Minimum quantity is 1", { id: 'minimum' })
        }
        else if (!reduce && finalQuantity >= 10) {
            return toast.error("Maximum quantity is 10", { id: 'maximum' })
        }
        setFinalQuantity(prevQuantity => reduce ? prevQuantity - 1 : prevQuantity + 1);

        const tempFinalQuantity = reduce ? finalQuantity - 1 : finalQuantity + 1;
        if (itemQuantity === tempFinalQuantity) {
            return setUpdateOperation(prevUpdateOperation => prevUpdateOperation.filter(cartInfo => cartInfo.id !== _id));
        }
        setUpdateOperation(prevUpdateOperation => {
            return [...prevUpdateOperation.filter(cartInfo => cartInfo.id !== _id), {
                id: _id,
                quantity: tempFinalQuantity
            }]
        });
    }

    return (
        <div
            className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 group">
            <div className="w-full md:max-w-24">
                <img src={imageUrl[0]} alt="perfume bottle image"
                    className="mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center">
                        <h6 className="font-semibold text-base leading-7 text-black">{itemName}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{category.name}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${itemPrice}</h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                        <button
                            onClick={() => changeQuantity()}
                            className="group rounded-l-xl px-4 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            -
                        </button>
                        <input type="text"
                            readOnly
                            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[60px] min-w-[40px] placeholder:text-gray-900 py-[6px] text-center bg-transparent"
                            value={finalQuantity} />
                        <button
                            onClick={() => changeQuantity(false)}
                            className="group rounded-r-xl px-5 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${finalQuantity * itemPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;