import axios from "axios";
import toast from "react-hot-toast";

export const useAxiosErrorToast = () => {
    return (error:Error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                toast.error(error.response.data?.error);
            } else if (error.request) {
                toast.error('No response received from server');
            } else {
                toast.error('Error setting up the request');
            }
        } else {
            toast.error('An unexpected error occurred');
        }
    }
};