import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import AuthContext from "../../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleLogin, handleUpdate } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log("information", data);
  //   createUser(data.email, data.password)
  //     .then((res) => {
  //       console.log(res);
  //       handleUpdate(data.name, data.photoURL);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      await handleUpdate(data.name, data.photoURL);
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" py-20  flex items-center justify-center bg-white   ">
      <div className="    p-8 md:p-12 w-full  ">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tertiary-text mb-2">
            Create Account
          </h1>
          <p className="base-text">Join ZapShift Delivery today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 lg:px-20 ">
          <div className="relative">
            <label className="block text-sm font-semibold base-text mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("name")}
                type="text"
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-text focus:outline-none transition-all duration-300 hover:border-gray-300"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold base-text mb-2">
              Photo URL
            </label>
            <div className="relative">
              <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("photoURL")}
                type="text"
                placeholder="Enter photo URL"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-text focus:outline-none transition-all duration-300 hover:border-gray-300"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold base-text mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-text focus:outline-none transition-all duration-300 hover:border-gray-300"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold base-text mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Must contain at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "Must include uppercase, lowercase, number and special character",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-secondary-text focus:outline-none transition-all duration-300 hover:border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl" />
                ) : (
                  <FiEye className="text-xl" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 italic">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full ${
              isSubmitting ? "bg-lime-100" : "primary-bg"
            } text-gray-800 font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] mt-6`}
          >
            {isSubmitting ? "Creating your account..." : "Register"}
          </button>
          <div className="text-center mt-6">
            <p className="base-text text-sm">
              Already have an account?{" "}
              <a
                href="#"
                className="secondary-text font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
          <p className="text-lg font-semibold italic text-center">or</p>
          <button
            onClick={async () => {
              const res = await googleLogin();
              console.log(res);
            }}
            type="button"
            className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:shadow-lg hover:border-gray-400 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
