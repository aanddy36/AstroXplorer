import { FaIdCard, FaEnvelope, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { INewUser } from "../moduls";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useEffect } from "react";
import { MiniSpinner } from "../ui/MiniSpinner";
import { createUser } from "../features/Auth/authSlice";
import { motion } from "framer-motion";

export const SignUp = () => {
  const dispatch = useDispatch() as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoggedIn, isRegistering, errorSignup } = useSelector(
    (store: RootState) => store.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (errorSignup) {
      reset({
        signupName: "",
        signupSurname: "",
        signupPassword: "",
        signupConfirm: "",
      });
    }
    if (isLoggedIn) {
      navigate(-1);
    }
  }, [errorSignup, isRegistering, isLoggedIn]);
  const onSubmit = (data: INewUser) => {
    dispatch(createUser(data));
  };
  return (
    <div
      className="h-0 laptop:h-[800px] relative z-[1] w-full bg-[url('/src/images/bgImages/nasa.jpg')] bg-cover bg-top
    before:content-[''] before:absolute before:inset-0 before:bg-black/50"
    >
      <div className="text-2xl font-spacex absolute z-[2] left-8 laptop:left-16 top-8 laptop:top-10 text-white">
        <Link to="/">astroX</Link>
      </div>
      <motion.div
        className="w-full laptop:w-[490px] bg-black laptop:bg-black/90 text-white absolute z-[1] laptop:mt-24 
        px-8 laptop:py-8 pb-16 pt-28 flex flex-col justify-between left-[50%] translate-x-[-50%]"
        initial={{ opacity: 0, translateX: "-100%" }}
        animate={{ opacity: 1, translateX: "-50%" }}
        transition={{ duration: 0.5 }}
      >
        <div className=" flex flex-col gap-2 mb-10 text-sm text-white/40">
          <span>START FOR FREE</span>
          <h1 className="font-semibold text-3xl text-white">
            Create New Account
          </h1>
          <Link
            to="/login"
            className="transition duration-300 hover:underline hover:text-white"
          >
            Already a member? <span className="text-yellow-500">Log In</span>
          </Link>
        </div>
        {errorSignup && (
          <span className="bg-[#ff2020] text-sm mb-5 py-2 px-4 ">
            <span className="font-semibold tracking-wide">{errorSignup}</span>.
            Please try again.
          </span>
        )}
        <form
          className="flex flex-col justify-between text-white/40"
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        >
          <div className="flex gap-3 mb-3 items-start">
            <label
              htmlFor="signupName"
              className="flex flex-col-reverse gap-1 relative w-full text-sm"
            >
              {errors.signupName?.message && (
                <span className="text-[#ff2020]">
                  {errors.signupName.message.toString()}
                </span>
              )}
              <input
                id="signupName"
                className={`bg-transparent border-2 ${
                  errors.signupName?.message
                    ? "border-[#ff2020] focus:border-[#ff2020]"
                    : "border-white/40 focus:border-white/80"
                }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
              duration-200 w-full disabled:cursor-not-allowed`}
                type="text"
                maxLength={20}
                placeholder="John"
                {...register("signupName", {
                  required: "This field is required" as unknown as boolean,
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  pattern: {
                    value: /^(?! $)([A-Za-z]+ ?)*[A-Za-z]+$/,
                    message: "Name must contain only letters",
                  },
                })}
                disabled={isRegistering}
              />
              <span className="cursor-pointer peer-focus:text-white transition duration-200">
                First Name
              </span>
              <FaIdCard className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
            </label>
            <label
              htmlFor="signupSurname"
              className="flex flex-col-reverse gap-1 relative w-full text-sm"
            >
              {errors.signupSurname?.message && (
                <span className="text-[#ff2020]">
                  {errors.signupSurname.message.toString()}
                </span>
              )}
              <input
                id="signupSurname"
                className={`bg-transparent border-2 ${
                  errors.signupSurname?.message
                    ? "border-[#ff2020] focus:border-[#ff2020]"
                    : "border-white/40 focus:border-white/80"
                }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
              duration-200 w-full disabled:cursor-not-allowed`}
                type="text"
                maxLength={20}
                placeholder="Doe"
                {...register("signupSurname", {
                  required: "This field is required" as unknown as boolean,
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                  pattern: {
                    value: /^(?! $)([A-Za-z]+ ?)*[A-Za-z]+$/,
                    message: "Last name must contain only letters",
                  },
                })}
                disabled={isRegistering}
              />
              <span className="cursor-pointer peer-focus:text-white transition duration-200">
                Last Name
              </span>
              <FaIdCard className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
            </label>
          </div>
          <label
            htmlFor="signupEmail"
            className="flex flex-col-reverse gap-1 relative mb-3 text-sm"
          >
            {errors.signupEmail?.message && (
              <span className="text-[#ff2020]">
                {errors.signupEmail.message.toString()}
              </span>
            )}
            <input
              id="signupEmail"
              className={`bg-transparent border-2 ${
                errors.signupEmail?.message
                  ? "border-[#ff2020] focus:border-[#ff2020]"
                  : "border-white/40 focus:border-white/80"
              }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
              type="email"
              placeholder="Enter Email"
              {...register("signupEmail", {
                required: "This field is required" as unknown as boolean,
              })}
              disabled={isRegistering}
            />
            <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Email
            </span>
            <FaEnvelope className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
          </label>
          <label
            htmlFor="signupPassword"
            className="flex flex-col-reverse gap-1 relative text-sm mb-3"
          >
            {errors.signupPassword?.message && (
              <span className="text-[#ff2020]">
                {errors.signupPassword.message.toString()}
              </span>
            )}
            <input
              className={`bg-transparent border-2 ${
                errors.signupPassword?.message
                  ? "border-[#ff2020] focus:border-[#ff2020]"
                  : "border-white/40 focus:border-white/80"
              }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
              id="signupPassword"
              type="password"
              placeholder="Enter Password"
              {...register("signupPassword", {
                required: "This field is required" as unknown as boolean,
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must have maximum 16 characters",
                },
              })}
              disabled={isRegistering}
            />
            <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Password
            </span>
            <FaLock className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
          </label>
          <label
            htmlFor="signupConfirm"
            className="flex flex-col-reverse gap-1 relative text-sm mb-3"
          >
            {errors.signupConfirm?.message && (
              <span className="text-[#ff2020]">
                {errors.signupConfirm.message.toString()}
              </span>
            )}
            <input
              className={`bg-transparent border-2 ${
                errors.signupConfirm?.message
                  ? "border-[#ff2020] focus:border-[#ff2020]"
                  : "border-white/40 focus:border-white/80"
              }  pl-10 pr-4 py-[6px] focus:outline-none text-white placeholder:text-white/40  peer transition 
            duration-200 w-full disabled:cursor-not-allowed`}
              id="signupConfirm"
              type="password"
              placeholder="Repeat Password"
              {...register("signupConfirm", {
                required: "This field is required" as unknown as boolean,
                validate: (value: string) =>
                  value === getValues().signupPassword ||
                  "Passwords don't match",
              })}
              disabled={isRegistering}
            />
            <span className="cursor-pointer peer-focus:text-white transition duration-200">
              Confirm Password
            </span>
            <FaLock className="absolute top-[35px] left-[14px] peer-focus:text-yellow-500" />
          </label>
          <button
            className="px-4 mt-8 py-[6px] transition duration-300 bg-yellow-500 text-black font-semibold text-base
          hover:bg-yellow-200 disabled:cursor-not-allowed"
            disabled={isRegistering}
          >
            {isRegistering ? <MiniSpinner /> : "Create account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
