import React, { useEffect } from "react";
import { ISaleEvent } from "../../../types";
import ProductCard from "../../../components/nextui/ProductCard/ProductCard";
import './EventCard.css';
import EventDeleteAlert from "../../../components/AlertDialog/EventDeleteAlert";
import { useDeleteEvent } from "../../../hooks/useDeleteEvent";
import { useAxiosErrorToast } from "../../../hooks/useAxiosErrorToast";
import toast from "react-hot-toast";

interface EventCardProps {
    event: ISaleEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { name, mainDiscount, discountForCheapProducts, products, _id: eventId } = event;
    const {
        closeEvent, closingEvent, eventCloseError, eventDeleted
    } = useDeleteEvent()
    const axiosErrorToast = useAxiosErrorToast()

    useEffect(() => {
        eventCloseError && axiosErrorToast(eventCloseError)
        eventDeleted && toast.success('Event Deleted')
    }, [eventCloseError, eventDeleted])

    return (
        <div className="event-card">
            <div className="event-card-header center mb-10">
                <table className="shadow-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-dark-red text-secondary">
                        <th scope="col" className="px-6 py-3 text-base">Event Name</th>
                        <th scope="col" className="px-6 py-3 text-base">Main Discount</th>
                        <th scope="col" className="px-6 py-3 text-base">Cheap Product Discount</th>
                        <th scope="col" className="px-6 py-3 text-base">Total Products</th>
                        <th scope="col" className="px-6 py-3 text-base">Action</th>
                    </thead>
                    <tbody>
                        <tr className="even:bg-[#f2f2f2] border-b border-b-light-ash">
                            <td className="px-6 py-4 text-sm font-medium">{name}</td>
                            <td className="px-6 py-4 text-sm font-medium">{mainDiscount}</td>
                            <td className="px-6 py-4 text-sm font-medium">{discountForCheapProducts}</td>
                            <td className="px-6 py-4 text-sm font-medium">{products.length}</td>
                            <td className="px-6 py-4 text-sm font-medium">
                                <EventDeleteAlert closeEvent={closeEvent} eventId={eventId} closingEvent={closingEvent} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-[#f5f5f5] p-5 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-center">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default EventCard;
