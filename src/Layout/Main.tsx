import Footer from "../pages/shared/Footer";
import Navigation from "../pages/shared/Navigation";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen space-y-8">
      <Navigation />
      <div className="relative flex-grow p-2 md:p-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
