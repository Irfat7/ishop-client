import { Link, NavLink } from "react-router-dom";
import IShopLogo from "/logos/IShop-Logo.svg";
import Search from "../../components/universe/Search/Search";
import Cart from "../../components/Cart/Cart";
import UserDropDown from "../../components/nextui/UserDropDown";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserIcon from "/icons/user.svg";

const Navigation = () => {
  const { user } = useAuthContext()
  const { logOut } = useLogout();

  return (
    <nav className="md:md-padding flex items-center justify-between bg-primary p-2">
      <div className="flex items-center gap-1 md:w-1/3">
        <img src={IShopLogo} className="w-10" alt="IShop Logo" />
        <p className="h3-medium md:h2-bold">IShop</p>
      </div>

      <div className="h3-medium hidden w-1/3 gap-4 md:flex md:justify-center">
        <p onClick={() => logOut()}>logout</p>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-b-dark-red" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-b-dark-red" : ""
          }
        >
          About Us
        </NavLink>
      </div>

      <div className="flex items-center justify-end gap-4 md:w-1/3">
        <Search />
        <NavLink to="/cart">
          <Cart />
        </NavLink>
        {
          user ?
            <UserDropDown /> :
            <Link to='/sign-in'>
              <img src={UserIcon} alt="User Icon" />
            </Link>
        }
      </div>
    </nav>
  );
};

export default Navigation;
