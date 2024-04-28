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

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: '/:categoryName',
                element: <Category />
            },
            {
                path: '/product/:productId',
                element: <SingleProduct />
            },
            {
                path: '/sign-in',
                element: <AccountForm loginPage={true}/>
            },
            {
                path: '/sign-up',
                element: <AccountForm loginPage={false}/>
            }
        ]
    },
    {
        path: '/admin',
        element: <Admin></Admin>,
        children: [
            {
                path: '/admin/add-product',
                element: <AddProduct />
            },
            {
                path: '/admin/search',
                element: <SearchProduct />
            },
            {
                path: '/admin/assign-role',
                element: <p>assign role page</p>
            },
            {
                path: '/admin/add-category',
                element: <p>add category page</p>
            },
            {
                path: '/admin/orders',
                element: <p>orders page</p>
            },
            {
                path: '/admin/sale-events',
                element: <p>sale events page</p>
            },
            {
                path: '/admin/coupons',
                element: <p>coupons page</p>
            },
        ]
    },
    {
        path: '*',
        element: <ErrorMessage code={404} message="Page does not exist" />
    }
])

export default router