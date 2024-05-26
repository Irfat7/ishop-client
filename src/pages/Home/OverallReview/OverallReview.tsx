import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import OverallReviewCard from "./OverallReviewCard";
import { useGetOverallReview } from "../../../hooks/useGetOverallReview";
import { IOverallReview } from "../../../types";
import { motion } from 'framer-motion'

const OverallReview = () => {
    const { overallReviews } = useGetOverallReview()
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
        >
            <SectionHeader title="Customer Reviews" />
            <Carousel className="mx-auto w-11/12 md:w-9/12 bg-dark-red text-secondary rounded-tl-3xl rounded-br-3xl" autoPlay>
                {
                    overallReviews.map((review: IOverallReview) => <OverallReviewCard key={review._id} review={review} />)
                }
            </Carousel>
        </motion.div>
    );
};

export default OverallReview;