import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import SingleProduct from "../pages/SingleProduct/SingleProduct";
import Admin from "../Layout/Admin";
import AddProduct from "../pages/AddProduct/AddProduct";
import SearchProduct from "../pages/SearchProduct/SearchProduct";
import AccountForm from "../pages/shared/AccountForm";
import AdminOnly from "./Protected/AdminOnly";
import CartDetails from "../pages/CartDetails/CartDetails";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import MyOrders from "../pages/MyOrders/MyOrders";
import MyReviews from "../pages/MyReviews/MyReviews";
import UserProductSearch from "../pages/UserProductSearch/UserProductSearch";
import AssignRole from "../pages/AssignRole/AssignRole";
import AddCategory from "../pages/AddCategory/AddCategory";
import OrdersPageAdmin from "../pages/OrdersPageAdmin/OrdersPageAdmin";
import SaleEvents from "../pages/SaleEvents/SaleEvents";
import Coupons from "../pages/Coupons/Coupons";
import UsersOnly from "./Protected/UsersOnly";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/category/:categoryName",
        element: <Category />,
      },
      {
        path: "/cart",
        element: <UsersOnly><CartDetails /></UsersOnly>,
      },
      {
        path: "/product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "/sign-in",
        element: <AccountForm loginPage={true} />,
      },
      {
        path: "/sign-up",
        element: <AccountForm loginPage={false} />,
      },
      {
        path: '/payment',
        element: <UsersOnly><Payment /></UsersOnly>
      },
      {
        path: '/payment-status',
        element: <UsersOnly><PaymentSuccess /></UsersOnly>
      },
      {
        path: '/my-orders',
        element: <UsersOnly><MyOrders /></UsersOnly>
      },
      {
        path: '/my-reviews',
        element: <UsersOnly><MyReviews /></UsersOnly>
      },
      {
        path: '/search',
        element: <UserProductSearch />
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminOnly>
        <Admin></Admin>
      </AdminOnly>
    ),
    children: [
      {
        path: "/admin/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/search",
        element: <SearchProduct />,
      },
      {
        path: "/admin/assign-role",
        element: <AssignRole />
      },
      {
        path: "/admin/add-category",
        element: <AddCategory />,
      },
      {
        path: "/admin/orders",
        element: <OrdersPageAdmin />,
      },
      {
        path: "/admin/sale-events",
        element: <SaleEvents />
      },
      {
        path: "/admin/coupons",
        element: <Coupons />
      },
    ],
  },
  {
    path: "*",
    element: <ErrorMessage code={404} message="Page does not exist" />,
  },
]);

export default router;
