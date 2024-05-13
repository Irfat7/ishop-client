import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../constants";

export const useSearchProduct = (
  initialSearchTerm: string,
  debounceTime: number = 300,
) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(initialSearchTerm);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [initialSearchTerm, debounceTime]);

  const {
    data: searchedProducts,
    error: searchError,
    fetchNextPage: searchNextPage,
    hasNextPage: hasMoreProducts,
    isFetching: searchingProducts,
    isFetchingNextPage: searchingNextProducts
  } = useInfiniteQuery({
    queryKey: ["search", searchTerm],
    queryFn: async ({ pageParam = 0 }) => {
      if (searchTerm) {
        const response = await axios.get(`${baseUrl}products/items/search?page=${pageParam}&searchTerm=${searchTerm}`);
        return response.data;
      }
      return null;
    },
    enabled: !!searchTerm,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const limit = 3;
      if (lastPage.length < limit) {
        return undefined
      }
      return allPages.length + 1
    },
    refetchOnWindowFocus: false
  })

  return {
    searchedProducts,
    searchError,
    searchNextPage,
    hasMoreProducts,
    searchingProducts,
    searchingNextProducts,
  }
};
