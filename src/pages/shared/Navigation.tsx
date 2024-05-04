import { NavLink } from 'react-router-dom';
import IShopLogo from '/logos/IShop-Logo.svg'
import Search from '../../components/universe/Search/Search';
import Cart from '../../components/Cart/Cart';
import UserDropDown from '../../components/nextui/UserDropDown';
import { useLogout } from '../../hooks/useLogout';

const Navigation = () => {
  const { logOut } = useLogout()
  
  return (
    <nav className='flex justify-between items-center p-2 md:md-padding bg-primary'>
      <div className='flex gap-1 items-center md:w-1/3'>
        <img src={IShopLogo} className='w-10' alt="IShop Logo" />
        <p className='h3-medium md:h2-bold'>IShop</p>
      </div>

      <div className='w-1/3 hidden md:flex md:justify-center gap-4 h3-medium'>
        <p onClick={() => logOut()}>logout</p>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'border-b-2 border-b-dark-red' : ''
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? 'border-b-2 border-b-dark-red' : ''
          }
        >
          About Us
        </NavLink>
      </div>

      <div className='md:w-1/3 flex justify-end items-center gap-4'>
        <Search />
        <NavLink to='/cart'>
          <Cart />
        </NavLink>
        <UserDropDown />
      </div>
    </nav>
  );
};

export default Navigation;