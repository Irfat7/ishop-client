import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useGetOneCategory } from "../../hooks/useGetOneCategory";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import { IProduct } from "../../types";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import NothingFound from "../shared/NothingFound";
import toast from "react-hot-toast";

const Category = () => {
  const { categoryName = "mouse" } = useParams();
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage, error } =
    useGetOneCategory(categoryName);

  useEffect(() => {
    error && toast.error(error.message)
  }, [error])

  if (isFetching && !isFetchingNextPage) {
    return <Loader />;
  }

  if (!data) {
    return <ErrorMessage code={500} message="Something went wrong" />;
  }

  const firstPage = data.pages[0];
  if (!Array.isArray(firstPage)) {
    return <ErrorMessage code={404} message="Category does not exist" />;
  }

  return (
    <div>
      <SectionHeader title={categoryName} />
      <div className="grid grid-cols-2 place-items-center gap-y-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={`center mx-auto mt-5 hidden rounded-sm bg-dark-red px-5 py-1 text-secondary`}
        >
          {isFetchingNextPage ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            "Load More"
          )}
        </button>
      )}
      {data.pages[0].length === 0 && (
        <NothingFound message="yet to add product in this category" />
      )}
    </div>
  );
};

export default Category;
