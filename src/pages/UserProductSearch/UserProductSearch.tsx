import { useEffect } from "react";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import Loader from "../../components/universe/Loader/Loader";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import { IProduct } from "../../types";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import { useLocation } from "react-router-dom";

const UserProductSearch = () => {
    const axioErrorToast = useAxiosErrorToast()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name') || '';
    const nameArray = name.split('+')
    const nameWithSpace = nameArray.join(" ")
    const [products, , searchLoading, searchError] = useSearchProduct(nameWithSpace)
    const nothingFound = products.length === 0 && !searchLoading

    useEffect(() => {
        searchError && axioErrorToast(searchError)
    }, [searchError])

    return (
        <div>
            <SectionHeader title="Search" />
            {
                searchLoading ? <Loader /> :
                    nothingFound ? <p className="text-center text-2xl font-medium">No item found for <span className="underline text-dark-red">"{nameWithSpace}"</span></p> :
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                            {products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)}
                        </div>
            }
        </div>
    );
};

export default UserProductSearch;