import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllCategory } from "../../hooks/useGetAllCategory";
import Loader from "../../components/universe/Loader/Loader";
import { ICategory } from "../../types";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { handleImageUpload, separateFeaturesByFullStop } from "../../Utils";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useAxiosErrorToast } from "../../hooks/useAxiosErrorToast";

type Inputs = {
  productName: string;
  price: number;
  features: string;
  category: string;
  imageFile: [File];
  quantity: number;
};

const AddProduct = () => {
  const axiosInstance = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [categories, isCategoryPending, isCategoryError] = useGetAllCategory();
  const errorToast = useAxiosErrorToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const featuresList = separateFeaturesByFullStop(data.features);
    const imageUploadSuccess = await handleImageUpload(data.imageFile);
    if (imageUploadSuccess === false) {
      setLoading(false);
      return toast.error("Sorry, Something Went Wrong");
    }
    const newProduct = {
      name: data.productName,
      price: data.price,
      features: featuresList,
      category: data.category,
      imageUrl: imageUploadSuccess,
      quantity: data.quantity,
    };

    try {
      const response = await axiosInstance.post("products", newProduct);
      if (response.status === 200) {
        toast.success("New Product Added");
      }
    } catch (error) {
      errorToast(error as Error);
    }

    reset();
    setLoading(false);
  };

  if (isCategoryPending) {
    return <Loader />;
  }

  if (isCategoryError) {
    return <ErrorMessage code={404} message="Error Loading Category" />;
  }

  return (
    <form className="mx-auto max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-4 text-center text-xl font-bold md:mb-6 md:text-2xl">
        Add New Product
      </h2>
      <div className="group relative z-0 mb-5 w-full">
        <input
          type="text"
          {...register("productName", {
            required: "Product name is required",
            minLength: {
              value: 5,
              message: "Minimum length of the product name is 5",
            },
            maxLength: {
              value: 100,
              message: "Maximum length of the product name is 100 ",
            },
          })}
          id="productName"
          className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
          placeholder=" "
        />
        <label
          htmlFor="productName"
          className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          Product Name
        </label>
        {errors.productName && (
          <p className="text-sm text-dark-red">*{errors.productName.message}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 10,
                message: "Minimum price is 10",
              },
              max: {
                value: 10000,
                message: "Maximum price is 10000",
              },
            })}
            id="price"
            className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label
            htmlFor="price"
            className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:translate-x-1/4"
          >
            Price
          </label>
          {errors.price && (
            <p className="text-sm text-dark-red">*{errors.price.message}</p>
          )}
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <select
            {...register("category", {
              validate: (category) =>
                category != "" || "Category can't be empty",
            })}
            className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 text-sm"
          >
            <option disabled selected value="">
              Choose Category
            </option>
            {categories.map((category: ICategory) => (
              <option
                className="capitalize"
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-dark-red">*{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="group relative z-0 mb-5 w-full">
        <input
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: {
              value: 10,
              message: "Minimum of 10 products is allowed",
            },
            max: {
              value: 1000,
              message: "Maximum of 1000 products is allowed",
            },
          })}
          id="quantity"
          className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
          placeholder=" "
        />
        <label
          htmlFor="quantity"
          className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:translate-x-1/4"
        >
          Quantity
        </label>
        {errors.quantity && (
          <p className="text-sm text-dark-red">*{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="features"
          className="text-gray-900 dark:text-white mb-2 block text-sm font-medium"
        >
          Features Separated By Full Stop
        </label>
        <textarea
          {...register("features", {
            required: "Features are required",
          })}
          id="features"
          className="text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block h-32 w-full rounded-lg border p-2.5 text-sm md:h-40"
          placeholder="Features"
        ></textarea>
        {errors.features && (
          <p className="text-sm text-dark-red">*{errors.features.message}</p>
        )}
      </div>

      <div className="mt-2">
        <label
          className="text-gray-900 dark:text-white mb-2 block text-sm font-medium"
          htmlFor="user_avatar"
        >
          Add Photos (Minimum 2)
        </label>
        <input
          {...register("imageFile", {
            required: "Image is required",
            validate: {
              minTwoFile: (files) =>
                (files.length >= 2 && files.length <= 5) ||
                "Minimum of 2 files and maximum of 5 files",
            },
          })}
          className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg border text-sm focus:outline-none"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          multiple
        />
        {errors.imageFile && (
          <p className="text-sm text-dark-red">*{errors.imageFile.message}</p>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className="center mt-4 w-full rounded-md bg-dark-red py-1 text-center font-normal text-secondary"
      >
        {loading ? (
          <CircularProgress size={20} style={{ color: "white" }} />
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default AddProduct;
