import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';
import { useCreateNewAccount } from "../../hooks/useCreateNewAccount";
import toast from "react-hot-toast";

type Inputs = {
    userName: string
    email: string
    password: string
    confirmPassword: string | null
}

const AccountForm: React.FC<{ loginPage: boolean }> = ({ loginPage }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const { createNewAccount, isNewAccountCreating, isNewAccountCreatingError } = useCreateNewAccount();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    useEffect(() => {
        if (isNewAccountCreatingError) {
            toast.error("Account register failed");
        }
    }, [isNewAccountCreatingError]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (loginPage) {
            console.log('login function yet to develop')
        }
        else {
            const user = await createNewAccount({ email: data.email, password: data.password, displayName: data.userName })
            if (user.email) {
                console.log(user);
                toast.success("Account created")
            }
        }
    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
                <label htmlFor="userName" className="block mb-2 text-sm font-medium">Your Name</label>
                <input type="text" {...register("userName", {
                    required: "Username can not be empty",
                    minLength: {
                        value: 3,
                        message: "Minimum of length 3"
                    },
                    maxLength: {
                        value: 10,
                        message: "Maximum of length 10"
                    }
                })} id="userName" className="border text-sm rounded-lg block w-full p-2.5" placeholder="nor more than 10 character" />
                {errors.userName && <p className="text-dark-red text-sm">*{errors.userName.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                <input type="email" {...register("email", {
                    required: "Email can not be empty"
                })} id="email" className="border text-sm rounded-lg block w-full p-2.5" placeholder="name@gmail.com" />
                {errors.email && <p className="text-dark-red text-sm">*{errors.email.message}</p>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <div className="relative">
                    <input type={isPasswordVisible ? "text" : "password"} {...register("password", {
                        required: "Password can not be empty",
                        validate: (password) => {
                            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                            const isValidPassword = passwordRegex.test(password);
                            if (!isValidPassword) {
                                return "Password must contain at least one letter and one digit";
                            }
                            return true
                        }
                    })} id="password" className="border text-sm rounded-lg block w-full p-2.5" placeholder="at least 8 character containing alphanumerical" />
                    <p onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                        {
                            isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />
                        }
                    </p>
                </div>
                {errors.password && <p className="text-dark-red text-sm">*{errors.password.message}</p>}
            </div>
            {
                loginPage ||
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input type={isPasswordVisible ? "text" : "password"} {...register("confirmPassword", {
                        required: "This field can not be empty",
                        validate: (confirmPassword) => {
                            if (confirmPassword !== watch("password")) {
                                return "Password does not match"
                            }
                            return true
                        }
                    })} id="confirmPassword" className="border text-sm rounded-lg block w-full p-2.5" placeholder="retype password" />
                    {errors.confirmPassword && <p className="text-dark-red text-sm">*{errors.confirmPassword.message}</p>}
                </div>
            }

            <button
                type="submit"
                className="font-medium rounded-lg text-sm w-full px-5 py-2.5 center bg-dark-red text-secondary"
            >
                {
                    isNewAccountCreating ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Sign In Up'
                }
            </button>
        </form>
    );
};

export default AccountForm;