import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ICategory, IProduct } from "../../../types";

import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetAllCategory } from "../../../hooks/useGetAllCategory";
import {
  addFeaturesByFullStop,
  handleImageUpload,
  separateFeaturesByFullStop,
} from "../../../Utils";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../universe/Loader/Loader";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../lib/react-query/keys";

type Inputs = {
  productName: string;
  price: number;
  features: string;
  category: string;
  prevCategory: string;
  imageFile: [File];
  quantity: number;
  discount: number;
};

const UpdateProductModal: React.FC<IProduct> = ({
  _id,
  name,
  features,
  category: categoryName,
  imageUrl,
  quantity,
  price,
  discount,
}) => {
  const axiosInstance = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [newUrls, setNewUrls] = useState<string[]>(imageUrl);
  const [categories, isCategoryPending, isCategoryError] = useGetAllCategory();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const removeImage = (deletedUrl: string) => {
    const updatedUrl = newUrls.filter((url) => url !== deletedUrl);
    setNewUrls(updatedUrl);
  };

  if (isCategoryPending) {
    return <Loader />;
  }

  if (isCategoryError) {
    return <ErrorMessage code={500} message="Something Went Wrong" />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const featuresList = separateFeaturesByFullStop(data.features);
    const imageUploadSuccess = await handleImageUpload(data.imageFile);
    if (imageUploadSuccess === false) {
      setLoading(false);
      return toast.error("Sorry, Something Went Wrong");
    }
    const updatedProduct = {
      name: data.productName,
      price: data.price,
      features: featuresList,
      category: data.category,
      prevCategory: data.prevCategory,
      imageUrl: [...imageUploadSuccess, ...newUrls],
      quantity: data.quantity,
      discount: data.discount
    };

    console.log(updatedProduct);

    const response = await axiosInstance.patch(
      `products/${_id}`,
      updatedProduct,
    );
    if (response.status === 200) {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ONE_PRODUCT, _id]
      })
      toast.success("Product Updated");
    }
    reset();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        color="default"
        onPress={onOpen}
        className="center gap-2 rounded-md bg-dark-red p-2 text-secondary"
      >
        <BorderColorIcon />
        Edit Product
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        className="bg-secondary shadow-lg"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Product
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2 overflow-y-scroll">
                  {newUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        hidden={!newUrls.includes(url)}
                        src={url}
                        className="h-32 object-contain"
                      />
                      <button onClick={() => removeImage(url)}>
                        <DeleteIcon className="absolute right-0 top-0 bg-primary text-dark-red" />
                      </button>
                    </div>
                  ))}
                </div>
                <form
                  className="mx-auto max-w-md"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                      defaultValue={name}
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
                      <p className="text-sm text-dark-red">
                        *{errors.productName.message}
                      </p>
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
                        defaultValue={price}
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
                        <p className="text-sm text-dark-red">
                          *{errors.price.message}
                        </p>
                      )}
                    </div>
                    <div className="group relative z-0 mb-5 w-full">
                      <select
                        defaultValue={categoryName._id}
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
                        <p className="text-sm text-dark-red">
                          *{errors.category.message}
                        </p>
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
                      defaultValue={quantity}
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
                      <p className="text-sm text-dark-red">
                        *{errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div className="group relative z-0 mb-5 w-full">
                    <input
                      type="number"
                      {...register("discount", {
                        validate: (value) => {
                          if (Number(value) === 30 && watch("price") <= 1000) {
                            return "For 30% discount product price should be above 1000";
                          }
                          return true;
                        },
                        min: {
                          value: 0,
                          message: "Minimum discount is 0",
                        },
                        max: {
                          value: 30,
                          message: "Maximum discount is 30",
                        },
                      })}
                      defaultValue={discount}
                      id="discount"
                      className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
                      placeholder=" "
                    />
                    <label
                      htmlFor="discount"
                      className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:translate-x-1/4"
                    >
                      Discount
                    </label>
                    {errors.discount && (
                      <p className="text-sm text-dark-red">
                        *{errors.discount.message}
                      </p>
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
                      defaultValue={addFeaturesByFullStop(features)}
                      id="features"
                      className="text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 block h-32 w-full rounded-lg border p-2.5 text-sm md:h-40"
                      placeholder="Features"
                    ></textarea>
                    {errors.features && (
                      <p className="text-sm text-dark-red">
                        *{errors.features.message}
                      </p>
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
                        validate: {
                          minTwoFile: (files) =>
                            (files.length >= 2 - newUrls.length &&
                              files.length <= 5 - newUrls.length) ||
                            "Minimum of 2 files and maximum of 5 files",
                        },
                      })}
                      className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg border text-sm focus:outline-none"
                      aria-describedby="user_avatar_help"
                      id="user_avatar"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      multiple
                    />
                    {errors.imageFile && (
                      <p className="text-sm text-dark-red">
                        *{errors.imageFile.message}
                      </p>
                    )}
                  </div>

                  <input
                    hidden
                    type="text"
                    value={categoryName._id}
                    {...register("prevCategory")}
                  />

                  <button
                    disabled={loading}
                    type="submit"
                    className="center mt-4 w-full rounded-md bg-dark-red py-1 text-center font-normal text-secondary"
                  >
                    {loading ? (
                      <CircularProgress size={20} style={{ color: "white" }} />
                    ) : (
                      "Update Product"
                    )}
                  </button>
                </form>
              </ModalBody>
              <ModalFooter className="gap-x-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateProductModal;
