import React from "react";
import { IReview } from "../../types";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { Rating } from "@mui/material";

interface ReviewCardProps {
    review: IReview,
    userName: string
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review, userName }) => {
    return (
        <div className="mb-4 max-w-[700px] mx-auto border border-light-ash rounded-md">
            <Link
                to={`/product/${review.productId}`}>
                <div className="flex bg-primary justify-between items-center p-5">
                    <div className="center gap-1">
                        <div className="w-10 h-10 center bg-secondary rounded-full">
                            <PersonIcon />
                        </div>
                        <p>{userName}</p>
                    </div>
                    <Rating name="read-only" value={review.starCount} readOnly />
                </div>
                <p className="p-5">
                    {review.message}
                </p>
            </Link>
        </div>
    );
};

export default ReviewCard;