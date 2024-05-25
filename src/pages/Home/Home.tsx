import AboutUs from "../AboutUs/AboutUs";
import CarouselHome from "./Carousel/CarouselHome";
import CategoryHome from "./CategoryHome/CategoryHome";
import MostPopularProducts from "./MostPopularProducts/MostPopularProducts";
import OverallReview from "./OverallReview/OverallReview";
import SaleEvent from "./SaleEvent/SaleEvent";

const Home = () => {
  return (
    <div>
      <CarouselHome />
      <div className="mx-auto md:w-4/6">
        <CategoryHome />
        <SaleEvent />
        <MostPopularProducts />
        <AboutUs />
        <OverallReview />
      </div>
    </div>
  );
};

export default Home;
