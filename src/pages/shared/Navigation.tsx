import { NavLink } from 'react-router-dom';
import IShopLogo from '/logos/IShop-Logo.svg'
import Search from '../../components/universe/Search/Search';
import Cart from '../../components/Cart/Cart';
import UserDropDown from '../../components/nextui/UserDropDown';

const Navigation = () => {
  return (
    <nav className='flex justify-between items-center md-padding bg-primary'>
      <div className='flex gap-1 items-center md:w-1/3'>
        <img src={IShopLogo} className='w-10' alt="IShop Logo" />
        <p className='h3-medium md:h2-bold'>IShop</p>
      </div>

      <div className='w-1/3 hidden md:flex md:justify-center gap-2 h3-medium'>
        <NavLink to='/' >
          Home
        </NavLink>
        <NavLink to='/' >
          About Us
        </NavLink>
      </div>

      <div className='md:w-1/3 flex justify-end items-center'>
        <Search />
        <NavLink to='/'>
          <Cart />
        </NavLink>
        {/* <UserDropDown /> */}
      </div>
    </nav>
  );
};

export default Navigation;