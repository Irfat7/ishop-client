import { useState } from "react";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { IProduct } from "../../types";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, status, productsLoading, productError] =
    useSearchProduct(searchTerm);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (productError) {
    return <ErrorMessage code={status} message="Error Searching Product" />;
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-xl font-bold md:mb-6 md:text-2xl">
        Search Product
      </h2>
      <form>
        <div className="group relative z-0 mx-auto mb-5 w-full md:w-1/2">
          <input
            type="text"
            id="productName"
            className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
            placeholder=" "
            onKeyUp={(event) =>
              handleSearchChange((event.target as HTMLInputElement).value)
            }
          />
          <label
            htmlFor="productName"
            className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Product Name
          </label>
        </div>
      </form>
      <div>
        <div className="flex gap-2 gap-y-4">
          {productsLoading ? (
            <Loader />
          ) : products.length === 0 && searchTerm !== "" ? (
            <p className="w-full text-center">"{searchTerm}" has 0 result</p>
          ) : (
            products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
