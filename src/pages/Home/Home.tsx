import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CategoryCard from "../../components/nextui/CategoryCard";
import ProductCard from "../../components/nextui/ProductCard/ProductCard";
import Loader from "../../components/universe/Loader/Loader";
import { useGetAllCategory } from "../../hooks/useGetAllCategory";
import { useGetSaleEvent } from "../../hooks/useGetSaleEvent";
import { ICategory, IProduct } from "../../types";
import AboutUs from "../AboutUs/AboutUs";
import CarouselHome from "./Carousel/CarouselHome";
import MostPopularProducts from "./MostPopularProducts/MostPopularProducts";

const Home = () => {
  const [categories, isCategoryLoading, isCategoryError] = useGetAllCategory();
  const { event } = useGetSaleEvent()

  if (isCategoryError) {
    return <ErrorMessage code={500} message="Internal Server Error" />;
  }
  return (
    <div>
      <CarouselHome />
      <div className="mx-auto md:w-4/6">
        <SectionHeader title="Shop By Category" />
        <div className="grid grid-cols-2 place-items-center gap-y-4 xl:grid-cols-3">
          {isCategoryLoading && <Loader />}
          {categories.map((category: ICategory) => (
            <CategoryCard
              key={category._id}
              categoryImage="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg"
              categoryName={category.name}
            />
          ))}
        </div>
        {
          event &&
          <>
            <SectionHeader title={event.name} />
            <div className="grid gap-5 justify-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                event.products.map((product: IProduct) => <ProductCard key={product._id} product={product} />)
              }
            </div>
          </>
        }
        <MostPopularProducts />
        <AboutUs />
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
