import React from "react";
import { Link } from "react-router-dom";

interface ErrorProps {
  code: number;
  message: string;
}
const ErrorMessage: React.FC<ErrorProps> = ({ code, message }) => {
  return (
    <div className="text-center">
      <h1 className="text-red-500 mb-4 text-6xl font-semibold md:text-9xl md:font-extrabold">
        {code}
      </h1>
      <p className="text-gray-600 mb-4 text-lg">{message}</p>
      <div className="animate-bounce">
        <svg
          className="text-red-500 mx-auto h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="text-gray-600 mt-4">
        Let's get you back{" "}
        <Link to="/" className="cursor-pointer text-dark-red underline">
          Home
        </Link>
        .
      </p>
    </div>
  );
};

export default ErrorMessage;
