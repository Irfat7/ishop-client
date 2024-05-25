import { Rating } from "@mui/material";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useIdMap } from "../../hooks/useIdMap";

interface OverallReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OverallReviewModal: React.FC<OverallReviewModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState<number>(5)
    const [message, setMessage] = useState<string>('')
    const [userId] = useIdMap()

    const handleOverallReview = () => {
        console.log(rating, message);
    }

    const validMessage = message.length >= 20 && message.length <= 200

    return (
        <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
            <ModalContent className="bg-primary">
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium">Star Value</label>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue || rating);
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                <textarea
                                    id="message"
                                    name="reviewMessage"
                                    rows={4}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-light-ash" placeholder="Write your thoughts here..."
                                ></textarea>
                                <p className="text-dark-red text-sm ml-1">
                                    {
                                        !message.length || validMessage ?
                                            '' :
                                            'Minimum of 20 lengths and maximum of 200 lengths'
                                    }
                                </p>
                            </div>
                            <button
                                disabled={!validMessage}
                                onClick={handleOverallReview}
                                className={`center w-full bg-dark-red p-2 rounded-md text-secondary ${!validMessage && 'opacity-60 cursor-not-allowed'}`}>
                                Submit
                            </button>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        Action
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OverallReviewModal;
