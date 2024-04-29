import { useForm, SubmitHandler } from "react-hook-form"
import { useGetAllCategory } from "../../hooks/useGetAllCategory"
import Loader from "../../components/universe/Loader/Loader"
import { ICategory } from "../../types"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import { handleImageUpload, separateFeaturesByFullStop } from "../../Utils"
import { useAxiosSecure } from "../../hooks/useAxiosSecure"
import { baseUrl } from "../../constants"
import toast from 'react-hot-toast';
import { useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

type Inputs = {
    productName: string
    price: number
    features: string
    category: string
    imageFile: [File]
    quantity: number
}

const AddProduct = () => {
    const axiosInstance = useAxiosSecure();
    const [loading, setLoading] = useState(false)
    const [categories, isCategoryPending, isCategoryError] = useGetAllCategory()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        const featuresList = separateFeaturesByFullStop(data.features)
        const imageUploadSuccess = await handleImageUpload(data.imageFile)
        if (imageUploadSuccess === false) {
            setLoading(false)
            return toast.error('Sorry, Something Went Wrong');
        }
        const newProduct = {
            name: data.productName,
            price: data.price,
            features: featuresList,
            category: data.category,
            imageUrl: imageUploadSuccess,
            quantity: data.quantity
        }

        const response = await axiosInstance.post(`${baseUrl}products`, newProduct)
        if (response.status === 200) {
            toast.success('New Product Added');
        }
        reset()
        setLoading(false)
    }

    if (isCategoryPending) {
        return <Loader />
    }

    if (isCategoryError) {
        return <ErrorMessage code={404} message="Error Loading Category" />
    }

    return (
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-xl md:text-2xl font-bold mb-4 md:mb-6">Add New Product</h2>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="text" {...register("productName", {
                        required: "Product name is required",
                        minLength: {
                            value: 5,
                            message: "Minimum length of the product name is 5"
                        },
                        maxLength: {
                            value: 100,
                            message: "Maximum length of the product name is 100 "
                        }
                    })}
                    id="productName"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                />
                <label htmlFor="productName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                {errors.productName && <p className="text-dark-red text-sm">*{errors.productName.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            min: {
                                value: 10,
                                message: "Minimum price is 10"
                            },
                            max: {
                                value: 10000,
                                message: "Maximum price is 10000"
                            }
                        })}
                        id="price"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                    />
                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    {errors.price && <p className="text-dark-red text-sm">*{errors.price.message}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select {...register("category", {
                        validate: (category) =>
                            category != '' || "Category can't be empty",
                    })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled selected value=''>Choose Category</option>
                        {
                            categories.map((category: ICategory) => <option className="capitalize" key={category._id} value={category._id}>{category.name}</option>)
                        }
                    </select>
                    {errors.category && <p className="text-dark-red text-sm">*{errors.category.message}</p>}
                </div>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="number" {...register("quantity", {
                    required: "Quantity is required",
                    min: {
                        value: 10,
                        message: "Minimum of 10 products is allowed"
                    },
                    max: {
                        value: 1000,
                        message: "Maximum of 1000 products is allowed"
                    }
                })} id="quantity" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="quantity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantity</label>
                {errors.quantity && <p className="text-dark-red text-sm">*{errors.quantity.message}</p>}
            </div>

            <div>
                <label htmlFor="features" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Features Separated By Full Stop</label>
                <textarea {...register("features", {
                    required: "Features are required"
                })} id="features" className="h-32 md:h-40 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Features"></textarea>
                {errors.features && <p className="text-dark-red text-sm">*{errors.features.message}</p>}
            </div>

            <div className="mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Add Photos (Minimum 2)</label>
                <input {...register("imageFile", {
                    required: "Image is required",
                    validate: {
                        minTwoFile: (files) => files.length >= 2 && files.length <= 5 || "Minimum of 2 files and maximum of 5 files"
                    }
                })} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/png, image/jpg, image/jpeg" multiple />
                {errors.imageFile && <p className="text-dark-red text-sm">*{errors.imageFile.message}</p>}
            </div>

            <button disabled={loading} type="submit" className="center w-full text-center bg-dark-red mt-4 text-secondary font-normal py-1 rounded-md">
                {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Add Product'}
            </button>
        </form>
    );
};

export default AddProduct;