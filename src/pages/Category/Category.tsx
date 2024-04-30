import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useGetOneCategory } from "../../hooks/useGetOneCategory";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import { IProduct } from "../../types";
import Loader from "../../components/universe/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Category = () => {
    const { categoryName = 'mouse' } = useParams()
    const [products, isProductLoading, isProductError] = useGetOneCategory(categoryName)
    if (products.invalidCategory) {
        return <ErrorMessage code={404} message='Invalid Category' />
    }
    if (isProductError) {
        return <ErrorMessage code={500} message='Something Went Wrong' />
    }
    return (
        <div>
            <SectionHeader title={categoryName} />
            <div className="grid gap-y-4 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {
                    isProductLoading ? <Loader /> :
                        products.length !== 0 && products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)
                }
            </div>
            {products.length === 0 && <p className="text-center">Yet to add product in this category</p>}
        </div>
    );
};

export default Category;