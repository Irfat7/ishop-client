import React, { FormEvent, useEffect } from "react";
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
    const { searchedProducts, searchingProducts, hasMoreProducts, searchError, searchNextPage, searchingNextProducts, refetchSearch, isRefetchingSearch, sortOption, setSortOption } = useSearchProduct(nameWithSpace)
    useEffect(() => {
        searchError && axiosErrorToast(searchError)
    }, [searchError])

    useEffect(() => {
        refetchSearch()
    }, [sortOption])

    const handleSortChange = (e: FormEvent) => {
        setSortOption((e.target as HTMLSelectElement).value)
    }

    if (searchingProducts && !searchingNextProducts && !isRefetchingSearch) {
        return <Loader />
    }

    if (!searchedProducts) {
        return <ErrorMessage code={500} message="Something went wrong" />;
    }

    if (!Array.isArray(searchedProducts.pages[0])) {
        return <ErrorMessage code={404} message="Nothing Found" />;
    }

    const nothingFound = searchedProducts.pages[0].length === 0 && !searchingProducts

    return (
        <div>
            <SectionHeader title="Search" />
            <form className="max-w-sm mb-4 ml-auto">
                <label htmlFor="sortOptions" className="block mb-2 text-base">Sort Option</label>
                <select onChange={(e) => handleSortChange(e)} id="sortOptions" className="border border-light-ash text-sm rounded-lg block w-full p-2.5">
                    <option defaultValue='default'>Default</option>
                    <option value="price">By Price</option>
                    <option value="averageRating">By Review</option>
                </select>
            </form>
            {
                isRefetchingSearch ? < Loader /> :
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
                (hasMoreProducts || isRefetchingSearch) && <button
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