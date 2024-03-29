import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '/carousel/Carousel-1.jpg'
import image2 from '/carousel/Carousel-2.jpg'
import image3 from '/carousel/Carousel-3.jpg'

const CarouselHome = () => {
    return (
        <Carousel>
            <div>
                <img src={image1} />
            </div>
            <div>
                <img src={image2} />
            </div>
            <div>
                <img src={image3} />
            </div>
        </Carousel>
    );
};

export default CarouselHome;