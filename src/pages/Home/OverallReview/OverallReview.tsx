import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import OverallReviewCard from "./OverallReviewCard";
import { useGetOverallReview } from "../../../hooks/useGetOverallReview";
import { IOverallReview } from "../../../types";
import AnimateComponent from "../../../components/FramerMotion/AnimateComponent";

const OverallReview = () => {
    const { overallReviews } = useGetOverallReview()
    return (
        <AnimateComponent>
            <>
                <SectionHeader title="Customer Reviews" />
                <Carousel className="mx-auto w-11/12 md:w-9/12 bg-dark-red text-secondary rounded-tl-3xl rounded-br-3xl" autoPlay>
                    {
                        overallReviews.map((review: IOverallReview) => <OverallReviewCard key={review._id} review={review} />)
                    }
                </Carousel>
            </>
        </AnimateComponent>
    );
};

export default OverallReview;