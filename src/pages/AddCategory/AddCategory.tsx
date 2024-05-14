import { SubmitHandler, useForm } from 'react-hook-form';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { useEffect, useState } from 'react';

type Inputs = {
    categoryName: string;
    imageFile: File
};

const AddCategory = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const [imageSrc, setImageSrc] = useState('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        
    };

    const imageSetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.files || e.target.files.length === 0) {
            setImageSrc('')
            return
        }
        setImageSrc(URL.createObjectURL(e.target.files[0]))
    }


    return (
        <div>
            <SectionHeader title='Add New Category' />
            <form className='mx-auto max-w-md shadow-md p-4' onSubmit={handleSubmit(onSubmit)}>
                {
                    imageSrc && <img src={imageSrc} alt="" className='w-full max-h-28 object-cover' />
                }
                <div className="mb-4">
                    <label
                        className="text-gray-900 dark:text-white mb-2 block text-sm font-medium"
                        htmlFor="user_avatar"
                    >
                        Add Photo
                    </label>
                    <input
                        {...register("imageFile", {
                            required: "Image is required",
                        })}
                        onChange={e => imageSetHandler(e)}
                        className="text-gray-900 border-gray-300 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full cursor-pointer rounded-lg border text-sm focus:outline-none"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                    />
                    {errors.imageFile && (
                        <p className="text-sm text-dark-red">*{errors.imageFile.message}</p>
                    )}
                </div>

                <div className="group relative z-0 mb-5 w-full">
                    <input
                        type="text"
                        {...register("categoryName", {
                            required: "Catgory name is required",
                            minLength: {
                                value: 3,
                                message: "Minimum length of the category name is 3",
                            },
                            maxLength: {
                                value: 20,
                                message: "Maximum length of the category name is 20 ",
                            },
                        })}
                        id="categoryName"
                        className="text-gray-900 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-blue-600 peer block w-full appearance-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-sm focus:outline-none focus:ring-0"
                        placeholder=" "
                    />
                    <label
                        htmlFor="categoryName"
                        className="text-gray-500 dark:text-gray-400 transhtmlForm peer-focus:text-blue-600 peer-focus:dark:text-blue-500 absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                    >
                        Category Name
                    </label>
                    {errors.categoryName && (
                        <p className="text-sm text-dark-red">*{errors.categoryName.message}</p>
                    )}
                </div>
                <button
                    /* disabled={loading} */
                    type="submit"
                    className="center mt-4 w-full rounded-md bg-dark-red py-1 text-center font-normal text-secondary"
                >
                    {/* {loading ? (
                        <CircularProgress size={20} style={{ color: "white" }} />
                    ) : (
                        "Add Product"
                    )} */}
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddCategory;