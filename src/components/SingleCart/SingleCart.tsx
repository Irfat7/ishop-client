import { SetStateAction, useEffect, useState } from "react";
import { ICart } from "../../types";
import toast from "react-hot-toast";
import { getDiscountedPrice } from "../../Utils";
import { useDeleteProductFromCart } from "../../hooks/useDeleteProductFromCart";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";

interface CartProps {
  cartItem: ICart;
  setUpdateOperation: React.Dispatch<
    SetStateAction<{ id: string; pId: string; quantity: number }[]>
  >;
}

const SingleCart: React.FC<CartProps> = ({ cartItem, setUpdateOperation }) => {
  const { productId, quantity: itemQuantity, _id: cartId } = cartItem;
  const { imageUrl, name: itemName, category, price: itemPrice, discount } = productId;

  const [finalQuantity, setFinalQuantity] = useState<number>(itemQuantity);
  const axiosErrorToast = useAxiosErrorToast()

  const { deleteProduct, deletingProduct, deletingProductError } = useDeleteProductFromCart()

  useEffect(() => {
    deletingProductError && axiosErrorToast(deletingProductError)
  }, [deletingProductError])

  const changeQuantity = (reduce: boolean = true) => {
    if (reduce && finalQuantity <= 1) {
      return toast.error("Minimum quantity is 1", { id: "minimum" });
    } else if (!reduce && finalQuantity >= 10) {
      return toast.error("Maximum quantity is 10", { id: "maximum" });
    }
    setFinalQuantity((prevQuantity) =>
      reduce ? prevQuantity - 1 : prevQuantity + 1,
    );

    const tempFinalQuantity = reduce ? finalQuantity - 1 : finalQuantity + 1;
    if (itemQuantity === tempFinalQuantity) {
      return setUpdateOperation((prevUpdateOperation) =>
        prevUpdateOperation.filter((cartInfo) => cartInfo.id !== cartId),
      );
    }
    setUpdateOperation((prevUpdateOperation) => {
      return [
        ...prevUpdateOperation.filter((cartInfo) => cartInfo.id !== cartId),
        {
          id: cartId,
          pId: productId._id,
          quantity: tempFinalQuantity,
        },
      ];
    });
  };

  const discountedPrice = discount === 0 ? itemPrice : getDiscountedPrice(itemPrice, discount)

  return (
    <div className="group flex flex-col gap-5 py-6 min-[500px]:flex-row min-[500px]:items-center">
      <div className="w-full md:max-w-24">
        <img src={imageUrl[0]} alt="perfume bottle image" className="mx-auto" />
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center">
            <h6 className="text-black text-base font-semibold leading-7">
              {itemName}
            </h6>
            <h6 className="text-gray-500 text-base font-normal leading-7">
              {category.name}
            </h6>
            <h6 className="text-gray-600 group-hover:text-indigo-600 text-base font-medium leading-7 transition-all duration-300">
              ${discountedPrice}
            </h6>
          </div>
        </div>
        <div className="flex h-full items-center max-md:mt-3 max-[500px]:justify-center">
          <div className="flex h-full items-center">
            <button
              onClick={() => changeQuantity()}
              className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300 group flex items-center justify-center rounded-l-xl border px-4 py-2 shadow-sm shadow-transparent transition-all duration-500"
            >
              -
            </button>
            <input
              type="text"
              readOnly
              className="border-gray-200 text-gray-900 placeholder:text-gray-900 w-full min-w-[40px] max-w-[60px] border-y bg-transparent py-[6px] text-center text-lg font-semibold outline-none"
              value={finalQuantity}
            />
            <button
              onClick={() => changeQuantity(false)}
              className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300 group flex items-center justify-center rounded-r-xl border px-5 py-2 shadow-sm shadow-transparent transition-all duration-500"
            >
              +
            </button>
          </div>
        </div>
        <div className="center mt-5 md:mt-0">
          <button
            disabled={deletingProduct}
            onClick={() => deleteProduct(cartId)}
            className={`bg-dark-red text-secondary py-1 px-2 rounded duration-300 hover:bg-secondary hover:text-[black] hover:border hover:border-dark-red ${deletingProduct && 'cursor-not-allowed'}`}>
            Delete
          </button>
        </div>
        <div className="flex h-full items-center max-md:mt-3 max-[500px]:justify-center md:justify-end">
          <p className="text-gray-600 group-hover:text-indigo-600 text-center text-lg font-bold leading-8 transition-all duration-300">
            ${finalQuantity * discountedPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
