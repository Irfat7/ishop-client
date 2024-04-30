import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useGetOneCategory } from "../../hooks/useGetOneCategory";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import { IProduct } from "../../types";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const Category = () => {
    const { categoryName = 'mouse' } = useParams()
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetOneCategory(categoryName)

    if (isFetching && !isFetchingNextPage) {
        return <Loader />
    }

    if (!data) {
        return <ErrorMessage code={500} message="Something went wrong" />
    }

    if (!Array.isArray(data.pages[0])) {
        return <ErrorMessage code={404} message="Category does not exist" />
    }

    return (
        <div>
            <SectionHeader title={categoryName} />
            <div className="grid gap-y-4 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {
                    data.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.map((product: IProduct) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </React.Fragment>
                    ))
                }
            </div>
            {
                hasNextPage && <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className={`mt-5 center bg-dark-red text-secondary px-5 py-1 rounded-sm mx-auto hidden`}
                >
                    {isFetchingNextPage ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Load More'}
                </button>
            }
            {data.pages[0].length === 0 && <p className="text-center">Yet to add product in this category</p>}
        </div>
    );
};

export default Category;