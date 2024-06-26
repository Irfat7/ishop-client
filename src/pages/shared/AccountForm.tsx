import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import { useCreateNewAccount } from "../../hooks/useCreateNewAccount";
import toast from "react-hot-toast";
import { useLogin } from "../../hooks/useLogin";
import { Link, Navigate } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import { useAuthContext } from "../../hooks/useAuthContext";

type Inputs = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const AccountForm: React.FC<{ loginPage: boolean }> = ({
  loginPage,
}): React.ReactNode => {
  const { user } = useAuthContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { createNewAccount, isNewAccountCreating } = useCreateNewAccount();
  const { login, isLoggingIn, loggedIn } = useLogin();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  if (!isNewAccountCreating && (loggedIn || user)) {
    return <Navigate to="/" replace={true} />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loginPage) {
      const user = await login({ email: data.email, password: data.password });
      if (!user) {
        return toast.error("Login failed");
      }
      toast.success("Logged in");
      reset();
    } else {
      const user = await createNewAccount({
        email: data.email,
        password: data.password,
        displayName: data.userName,
      });
      if (!user) {
        return toast.error("Account register failed");
      }
      toast.success("Account created, Now you can login");
      reset();
    }
  };

  return (
    <form className="mx-auto px-2 md:px-0 max-w-sm w-full " onSubmit={handleSubmit(onSubmit)}>
      <SectionHeader title={loginPage ? "Login" : "Register"} />
      {loginPage || (
        <div className="mb-5">
          <label htmlFor="userName" className="mb-2 block text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            {...register("userName", {
              required: "Username can not be empty",
              minLength: {
                value: 3,
                message: "Minimum of length 3",
              },
              maxLength: {
                value: 10,
                message: "Maximum of length 10",
              },
            })}
            id="userName"
            className="block w-full rounded-lg border p-2.5 text-sm"
            placeholder="nor more than 10 character"
          />
          {errors.userName && (
            <p className="text-sm text-dark-red">*{errors.userName.message}</p>
          )}
        </div>
      )}
      <div className="mb-5">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Your email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email can not be empty",
          })}
          id="email"
          className="block w-full rounded-lg border p-2.5 text-sm"
          placeholder="name@gmail.com"
        />
        {errors.email && (
          <p className="text-sm text-dark-red">*{errors.email.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="text-gray-900 dark:text-white mb-2 block text-sm font-medium"
        >
          Your password
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...register("password", {
              required: "Password can not be empty",
              validate: (password) => {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                const isValidPassword = passwordRegex.test(password);
                if (!isValidPassword) {
                  return "Password must contain at least one letter and one digit";
                }
                return true;
              },
            })}
            id="password"
            className="block w-full rounded-lg border p-2.5 text-sm"
            placeholder="at least 8 character containing alphanumerical"
          />
          <p
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </p>
        </div>
        {errors.password && (
          <p className="text-sm text-dark-red">*{errors.password.message}</p>
        )}
      </div>
      {loginPage || (
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="text-gray-900 dark:text-white mb-2 block text-sm font-medium"
          >
            Repeat password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...register("confirmPassword", {
              required: "This field can not be empty",
              validate: (confirmPassword) => {
                if (confirmPassword !== watch("password")) {
                  return "Password does not match";
                }
                return true;
              },
            })}
            id="confirmPassword"
            className="block w-full rounded-lg border p-2.5 text-sm"
            placeholder="retype password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-dark-red">
              *{errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="center w-full rounded-lg bg-dark-red px-5 py-2.5 text-sm font-medium text-secondary"
      >
        {isNewAccountCreating || isLoggingIn ? (
          <CircularProgress size={20} style={{ color: "white" }} />
        ) : loginPage ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </button>
      {
        loginPage ?
          <p className="text-sm mt-1">
            Does not have an account? <Link to='/sign-up' className="font-medium text-dark-red hover:underline dark:text-primary-500">Create here</Link>
          </p> :
          <p className="text-sm mt-1">
            Already have an account? <Link to='/sign-in' className="font-medium text-dark-red hover:underline dark:text-primary-500">Login here</Link>
          </p>
      }
    </form>
  );
};

export default AccountForm;
