import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useGetAllProducts = () => {
    const axiosInstance = useAxiosSecure()
    const {
        data: allProducts,
        isFetching: loadingProducts,
        error: productsLoadingError,
        hasNextPage: hasMoreProducts,
        fetchNextPage: getMoreProducts,
        isFetchingNextPage: fetchingMoreProducts
    } = useInfiniteQuery({
        queryKey: ['ALL_PRODUCTS'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axiosInstance.get(`/products?page=${pageParam}`)
            return response.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const limit = 10;
            if (lastPage.length < limit) {
                return undefined;
            }
            return allPages.length + 1;
        },
        refetchOnWindowFocus: false
    })
    return {
        allProducts, loadingProducts, productsLoadingError, hasMoreProducts, getMoreProducts, fetchingMoreProducts,
    }
};