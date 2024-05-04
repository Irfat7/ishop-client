interface cartDetailsProps {
    imageUrl: string,
    itemName: string,
    itemCategory: string,
    itemPrice: number,
    itemQuantity: number,
}

const SingleCart: React.FC<cartDetailsProps> = ({ imageUrl, itemName, itemCategory, itemPrice, itemQuantity }) => {
    return (
        <div
            className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 group">
            <div className="w-full md:max-w-24">
                <img src={imageUrl} alt="perfume bottle image"
                    className="mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center">
                        <h6 className="font-semibold text-base leading-7 text-black">{itemName}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{itemCategory}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">${itemPrice}</h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                        <button
                            className="group rounded-l-xl px-4 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            -
                        </button>
                        <input type="text"
                            readOnly
                            className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[60px] min-w-[40px] placeholder:text-gray-900 py-[6px] text-center bg-transparent"
                            value={itemQuantity} />
                        <button
                            className="group rounded-r-xl px-5 py-2 border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                            +
                        </button>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">${itemPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleCart;