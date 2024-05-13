import React, { useEffect } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import Loader from "../../components/universe/Loader/Loader";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import { IProduct } from "../../types";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { CircularProgress } from "@mui/material";

const UserProductSearch = () => {
    const axiosErrorToast = useAxiosErrorToast()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name') || '';
    const nameArray = name.split('+')
    const nameWithSpace = nameArray.join(" ")
    const { searchedProducts, searchingProducts, hasMoreProducts, searchError, searchNextPage, searchingNextProducts } = useSearchProduct(nameWithSpace)

    useEffect(() => {
        searchError && axiosErrorToast(searchError)
    }, [searchError])

    if (searchingProducts && !searchingNextProducts) {
        return <Loader />
    }

    if (!searchedProducts) {
        return <ErrorMessage code={500} message="Something went wrong" />;
    }

    if (!Array.isArray(searchedProducts.pages[0])) {
        return <ErrorMessage code={404} message="Nothing Found" />;
    }

    const nothingFound = searchedProducts.pages[0].length === 0 && !searchingProducts

    console.log(searchedProducts);

    return (
        <div>
            <SectionHeader title="Search" />
            {
                nothingFound ? <p className="text-center text-2xl font-medium">No item found for <span className="underline text-dark-red">"{nameWithSpace}"</span></p> :
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                        {searchedProducts.pages.map((group, i) => (
                            <React.Fragment key={i}>
                                {group.map((product: IProduct) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
            }
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
    );
};

export default UserProductSearch;