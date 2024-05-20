import { Fragment, ReactElement, useEffect } from "react";
import { useGetAllProducts } from "../../../hooks/useGetAllProducts";
import { useAxiosErrorToast } from "../../../hooks/useAxiosErrorToast";
import Loader from "../../../components/universe/Loader/Loader";
import AllProductsRow from "./AllProductsRow";
import { IProduct } from "../../../types";
import { CircularProgress } from "@mui/material";

interface AllProductsTableProps {
    selectedProducts: IProduct[],
    setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct[]>>
}

const AllProductsTable: React.FC<AllProductsTableProps> = ({ selectedProducts, setSelectedProduct }): ReactElement => {
    const axiosErrorToast = useAxiosErrorToast()
    const {
        allProducts, loadingProducts, productsLoadingError, hasMoreProducts, getMoreProducts, fetchingMoreProducts,
    } = useGetAllProducts()

    useEffect(() => {
        productsLoadingError && axiosErrorToast(productsLoadingError)
    }, [productsLoadingError, allProducts])

    if (loadingProducts && !fetchingMoreProducts) {
        return <Loader />
    }
    if (!allProducts) {
        return <>{axiosErrorToast(productsLoadingError || new Error('Something went wrong'))}
        </>
    }

    const selectedProductHandler = (productToAdd: IProduct) => {
        setSelectedProduct(prevProduct => {
            const exist = prevProduct.find(product => product._id == productToAdd._id)
            if (exist) {
                return prevProduct.filter(product => product._id != productToAdd._id)
            }
            return [...prevProduct, productToAdd]
        })
    }

    const productsArray = allProducts.pages || []

    return (
        <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-dark-red text-secondary">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Products Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    productsArray.map((group, index) => <Fragment key={index}>
                        {
                            group.map((product: IProduct) => <AllProductsRow
                                key={product._id}
                                product={product}
                                selected={selectedProducts.find(selectedProduct => selectedProduct._id === product._id)}
                                selectedProductHandler={selectedProductHandler}
                            />)
                        }
                    </Fragment>)
                }
            </tbody>
            {
                hasMoreProducts && <td colSpan={5}>
                    <button
                        onClick={() => getMoreProducts()}
                        disabled={fetchingMoreProducts}
                        className="center w-28 bg-dark-red p-2 rounded-md text-secondary mx-auto my-5">
                        {fetchingMoreProducts ?
                            <CircularProgress size={20} style={{ color: "white" }} /> : 'Load More'}
                    </button>
                </td>
            }
        </table>
    );
};

export default AllProductsTable;