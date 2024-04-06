import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CategoryCard from '../../components/nextui/CategoryCard';
import ProductCard from '../../components/nextui/ProductCard/ProductCard';
import CarouselHome from './Carousel/CarouselHome';

const Home = () => {
    return (
        <div>
            <CarouselHome />
            <div className='mx-auto md:w-4/6'>
                <SectionHeader title='Shop By Category' />
                <div className='grid gap-y-4 place-items-center grid-cols-2 md:grid-cols-3'>
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                    <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                </div>
                <SectionHeader title='Our Top Selling Products' />
                <div className='grid gap-y-6 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <SectionHeader title='Customer Reviews' />
                <div className='grid gap-y-6 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
};

export default Home;