import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { FormEvent, useState } from "react";
import { usePostReview } from "../../hooks/usePostReview";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

interface ReviewModalProps {
    reviewInfos: {
        id: string,
        orderId: string,
        productImage: string,
        productName: string,
        userId: string
    }
}

const ReviewModal: React.FC<ReviewModalProps> = ({ reviewInfos }) => {
    const { id: productId, productImage, productName, userId, orderId } = reviewInfos
    const [rating, setRating] = useState<number>(5)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { postReview, postingReview, reviewError } = usePostReview()
    const axiosErrorToast = useAxiosErrorToast()

    const handleReview = async (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        const reviewMessage = form.reviewMessage.value;
        if (reviewMessage.length > 100) {
            return setErrorMessage("*Review message can not be above 100 characters")
        }
        else if(reviewMessage.length === 0){
            return setErrorMessage("*Review message can not be empty")
        }
        const newReview = await postReview({ orderId, userId, productId, message: reviewMessage, starCount: rating })
        if (!newReview._id) {
            return reviewError && axiosErrorToast(reviewError)
        }
        toast.success("Review Successful")
        onOpenChange();
    }

    return (
        <>
            <Button onPress={onOpen}>
                <ReviewsIcon />
            </Button>
            <Modal
                backdrop="blur"
                className="bg-secondary"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
            >
                <ModalContent>
                    {/* {(onClose) => ( */}
                    <>
                        <ModalHeader className="flex flex-col gap-1">Review Item</ModalHeader>
                        <ModalBody>
                            <div>
                                <img
                                    className="w-full h-52 object-contain"
                                    src={productImage}
                                    alt="Product Image" />
                                <p className="mt-2 mb-5">{productName}</p>
                                <div>
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium">Star Value</label>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(_, newValue) => {
                                            setRating(newValue || rating);
                                        }}
                                    />
                                </div>
                                <form className="space-y-2" onSubmit={(event) => handleReview(event)}>
                                    <div>
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                        <textarea
                                            id="message"
                                            name="reviewMessage"
                                            rows={4}
                                            className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-light-ash" placeholder="Write your thoughts here..."
                                        ></textarea>
                                        <p className="text-dark-red text-sm ml-1">{errorMessage}</p>
                                    </div>
                                    <button
                                        disabled={postingReview}
                                        className={`center w-full bg-dark-red p-2 rounded-md text-secondary ${postingReview && 'cursor-not-allowed'}`}>
                                        {
                                            postingReview ? <CircularProgress size={20} style={{ color: "white" }} /> : "Submit"
                                        }
                                    </button>
                                </form>
                            </div>
                        </ModalBody>
                    </>
                    {/* )} */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReviewModal;