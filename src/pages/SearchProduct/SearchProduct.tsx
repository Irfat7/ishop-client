import React, { useEffect, useState } from "react";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import Loader from "../../components/universe/Loader/Loader";
import { IProduct } from "../../types";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import { CircularProgress } from "@mui/material";

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosErrorToast = useAxiosErrorToast()
  const { searchedProducts, searchingProducts, hasMoreProducts, searchError, searchNextPage, searchingNextProducts } = useSearchProduct(searchTerm)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const initialResult = !searchedProducts && !searchTerm
  const initialSearch = searchingProducts && !searchingNextProducts

  useEffect(() => {
    searchError && axiosErrorToast(searchError)
  }, [searchError])

  const nothingFound = searchedProducts?.pages[0].length === 0 && !searchingProducts

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
        <div className="mx-auto">
          {
            initialResult ? '' :
              initialSearch ? <Loader /> :
                nothingFound ? <p className="text-center text-2xl font-medium">No item found for <span className="underline text-dark-red">"{searchTerm}"</span></p> :
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-10">
                    {searchedProducts && searchedProducts.pages.map((group, i) => (
                      <React.Fragment key={i}>
                        {group.map((product: IProduct) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
          }
        </div>
        {
          hasMoreProducts && <button
            onClick={() => searchNextPage()}
            disabled={searchingNextProducts}
            className="center w-28 bg-dark-red p-2 rounded-md text-secondary mx-auto mt-5">
            {searchingNextProducts ?
              <CircularProgress size={20} style={{ color: "white" }} /> : 'Load More'}
          </button>
        }
      </div>
    </div>
  );
};

export default SearchProduct;