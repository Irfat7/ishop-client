import CartIcons from "/icons/cart.svg";
import { useGetUsersCart } from "../../hooks/useGetUsersCart";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";

const Cart = () => {
  const [carts, , cartError] = useGetUsersCart();
  const axiosToast = useAxiosErrorToast();

  cartError && axiosToast(cartError);

  return (
    <div className="relative bg-secondary">
      <img src={CartIcons} alt="Cart Icon" />
      <p className="base-regular absolute -right-3 -top-4 rounded-full bg-dark-red p-[2px] text-primary">
        {carts.length}
      </p>
    </div>
  );
};

export default Cart;
