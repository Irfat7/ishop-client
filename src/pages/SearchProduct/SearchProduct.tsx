import { useState } from "react";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { IProduct } from "../../types";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";

const SearchProduct = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, status, productsLoading, productError] = useSearchProduct(searchTerm)

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
    };

    if (productError) {
        return <ErrorMessage code={status} message="Error Searching Product" />
    }

    return (
        <div>
            <h2 className="text-center text-xl md:text-2xl font-bold mb-4 md:mb-6">Search Product</h2>
            <form>
                <div className="relative z-0 w-full md:w-1/2 mb-5 group mx-auto">
                    <input
                        type="text"
                        id="productName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                        onKeyUp={(event) => handleSearchChange((event.target as HTMLInputElement).value)}
                    />
                    <label htmlFor="productName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>
            </form>
            <div>
                <div className="flex gap-2 gap-y-4">
                    {
                        productsLoading ? <Loader /> :
                            products.length === 0 && searchTerm !== "" ?
                                <p className="w-full text-center">"{searchTerm}" has 0 result</p> :
                                products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchProduct;