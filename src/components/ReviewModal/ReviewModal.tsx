import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { FormEvent, useState } from "react";

interface ReviewModalProps {
    reviewInfos: {
        id: string,
        productImage: string,
        productName: string,
        userId: string
    }
}

const ReviewModal: React.FC<ReviewModalProps> = ({ reviewInfos }) => {
    const { id, productImage, productName, userId } = reviewInfos
    const [rating, setRating] = useState<number | null>(5)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [reviewMessage, setReviewMessage] = useState<string>('')

    const handleReview = (event: FormEvent) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement;
        const reviewMessage = form.reviewMessage.value;
        if (reviewMessage.length > 100) {
            return setReviewMessage("*Review can not be above 100 characters")
        }
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
                    {(onClose) => (
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
                                            onChange={(event, newValue) => {
                                                setRating(newValue);
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
                                            <p className="text-dark-red text-sm ml-1">{reviewMessage}</p>
                                        </div>
                                        <button className="bg-dark-red p-2 rounded-md text-secondary">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ReviewModal;