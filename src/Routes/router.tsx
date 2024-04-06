import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/Category";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import SingleProduct from "../pages/SingleProduct/SingleProduct";

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
            }
        ]
    },
    {
        path: '*',
        element: <ErrorMessage code={404} message="Page does not exist" />
    }
])

export default router