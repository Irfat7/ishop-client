import { useEffect } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Loader from '../../components/universe/Loader/Loader';
import { useAxiosErrorToast } from '../../hooks/useAxiosErrorToast';
import { useGetMyReviews } from '../../hooks/useGetMyReviews';
import ReviewCard from '../shared/ReviewCard';
import { IReview } from '../../types';
import { useAuthContext } from '../../hooks/useAuthContext';
import NothingFound from '../shared/NothingFound';

const MyReviews = () => {
    const [myReviews, isReviewsLoading, reviewsError] = useGetMyReviews()
    const noReviews = myReviews.length === 0 && !isReviewsLoading
    const axiosErrorToast = useAxiosErrorToast()
    const { user } = useAuthContext()

    useEffect(() => {
        reviewsError && axiosErrorToast(reviewsError)
    }, [reviewsError])

    return (
        <div>
            <SectionHeader title='My Reviews' />
            {
                isReviewsLoading ?
                    <Loader /> :
                    noReviews ?
                        <NothingFound message='No review' /> :
                        myReviews.map((review: IReview) => <ReviewCard key={review._id} review={review} userName={user?.displayName || 'Name Unavailable'} />)
            }
        </div>
    );
};

export default MyReviews;