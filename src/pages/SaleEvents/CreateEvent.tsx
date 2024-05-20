import { UseFormRegister, FieldErrors } from "react-hook-form"

type EventInputs = {
    eventName: string
    mainDiscount: number
    cheapDiscount: number
}

interface CreateEventProps {
    register: UseFormRegister<EventInputs>
    errors: FieldErrors<EventInputs>
}

const CreateEvent: React.FC<CreateEventProps> = ({ register, errors }) => {

    return (
        <div className="max-w-md mx-auto pt-2">
            <div className="relative z-0 w-full mb-5 group">
                <input {...register('eventName', {
                    required: "Event name is required",
                    minLength: {
                        value: 8,
                        message: "Minimum length of event name is 8"
                    },
                    maxLength: {
                        value: 20,
                        message: "Maximum length of event name is 20"
                    }
                })} type="text" name="eventName" id="eventName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Event Name</label>
                {errors.eventName && <p className="text-sm text-dark-red">{errors.eventName.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...register('mainDiscount', {
                    required: "Main discount can not be empty",
                    min: {
                        value: 5,
                        message: 'Minimum discount of 5 required'
                    },
                    max: {
                        value: 30,
                        message: 'Maximum discount of 30 available'
                    }
                })} type="number" name="mainDiscount" id="mainDiscount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="mainDiscount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Main Discount</label>
                {errors.mainDiscount && <p className="text-sm text-dark-red">{errors.mainDiscount.message}</p>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input {...register('cheapDiscount', {
                    required: "Cheap product discount can not be empty",
                    min: {
                        value: 5,
                        message: 'Minimum discount of 5 required'
                    },
                    max: {
                        value: 30,
                        message: 'Maximum discount of 25 available'
                    }
                })} type="number" name="cheapDiscount" id="cheapDiscount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="cheapDiscount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discount For Cheap Products</label>
                {errors.cheapDiscount && <p className="text-sm text-dark-red">{errors.cheapDiscount.message}</p>}
            </div>
        </div>
    );
};

export default CreateEvent;