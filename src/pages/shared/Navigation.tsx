import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import IShopLogo from "/logos/IShop-Logo.svg";
import Search from "../../components/universe/Search/Search";
import Cart from "../../components/Cart/Cart";
import UserDropDown from "../../components/nextui/UserDropDown";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserIcon from "/icons/user.svg";

const Navigation = () => {
  const { user } = useAuthContext();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <motion.nav
      className="sticky top-0 z-10 flex items-center justify-between bg-primary p-2"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <Link to='/' className="md:hidden flex items-center gap-1 md:w-1/3">
        <img src={IShopLogo} className="w-10" alt="IShop Logo" />
        <p className="h3-medium">IShop</p>
      </Link>

      <div className="hidden md:flex items-center gap-1 md:w-1/3">
        <img src={IShopLogo} className="w-10" alt="IShop Logo" />
        <p className="md:h2-bold">IShop</p>
      </div>

      <div className="h3-medium hidden w-1/3 gap-4 md:flex md:justify-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-b-dark-red" : ""
          }
        >
          Home
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
    </motion.nav>
  );
};

export default Navigation;
