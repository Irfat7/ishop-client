import Navigation from '../pages/shared/Navigation';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Navigation />
            <p>main section</p>
            <Outlet />
        </div>
    );
};

export default Main;