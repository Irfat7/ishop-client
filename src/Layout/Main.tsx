import Footer from '../pages/shared/Footer';
import Navigation from '../pages/shared/Navigation';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='space-y-8'>
            <Navigation />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;