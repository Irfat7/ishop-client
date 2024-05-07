import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CategoryCard from "../../components/nextui/CategoryCard";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import Loader from "../../components/universe/Loader/Loader";
import { useGetAllCategory } from "../../hooks/useGetAllCategory";
import { ICategory } from "../../types";
import CarouselHome from "./Carousel/CarouselHome";

const Home = () => {
  const [categories, isCategoryLoading, isCategoryError] = useGetAllCategory();
  if (isCategoryError) {
    return <ErrorMessage code={500} message="Internal Server Error" />;
  }
  return (
    <div>
      <CarouselHome />
      <div className="mx-auto md:w-4/6">
        <SectionHeader title="Shop By Category" />
        <div className="grid grid-cols-2 place-items-center gap-y-4 md:grid-cols-3">
          {isCategoryLoading && <Loader />}
          {categories.map((category: ICategory) => (
            <CategoryCard
              key={category._id}
              categoryImage="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg"
              categoryName={category.name}
            />
          ))}
        </div>
        <SectionHeader title="Our Top Selling Products" />
        <div className="grid grid-cols-2 place-items-center gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
        </div>
        <SectionHeader title="Customer Reviews" />
        <div className="grid grid-cols-2 place-items-center gap-y-6 md:grid-cols-3 lg:grid-cols-4">
          {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
