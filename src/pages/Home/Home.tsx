import CategoryCard from '../../components/nextui/CategoryCard';
import CarouselHome from './Carousel/CarouselHome';

const Home = () => {
    return (
        <div>
            <CarouselHome />
            <div className='grid gap-y-4 mx-auto md:w-4/6 place-items-center grid-cols-2 md:grid-cols-3'>
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
                <CategoryCard categoryImage='https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/accessories/wireless-mouse-gt/specs-img.jpg' categoryName='Mouse' />
            </div>
        </div>
    );
};

export default Home;