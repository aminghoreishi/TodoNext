import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { useForm } from "react-hook-form";
import Recaptcha from "../components/Recaptcha/Recaptcha";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { BeatLoader, ClipLoader } from "react-spinners";
function SignUpPage() {
  const [eyeCheck, setEyeCheck] = useState(false);

  const [isLoginGoogle, setIsLoginGoogle] = useState(false);

  const route = useRouter();

  //   const {data} = useQuery()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const signUpMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(res);

      if (res.status === 200) {
        route.replace("/");
      }

      const response = await res.json();

      console.log(response);

      return response;
    },
  });

  const onSubmit = (data) => {
    signUpMutation.mutate({
      email: data.email,
      userName: data.userName,
      password: data.password,
    });
  };

  return (
    <div className="flex items-center min-h-screen justify-center">
      <div className="p-2">
        <form
          className="bg-white rounded-lg p-2 max-sm:w-[290px] max-md:w-[330px] md:w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center text-lg font-semibold">Sign Up</h1>

          <div className="flex flex-col gap-3 mt-5">
            {/* Email Field */}
            <div className="">
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}$/,
                    message:
                      "Invalid email address. Please use a format like username@example.com.",
                  },
                })}
                type="text"
                placeholder="Email"
                className="border-2 text-sm outline-0 p-2 rounded-lg w-full border-gray-300"
              />
              {errors.email && (
                <p className="text-red-700 text-xs font-semibold mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div className="">
              <input
                {...register("userName", {
                  required: "Please enter your username",
                  pattern: {
                    value: /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
                    message:
                      "Invalid username. Must start with a letter, can only contain letters, numbers, or underscores, and be 3–16 characters long.",
                  },
                })}
                type="text"
                placeholder="Username"
                className="border-2 text-sm outline-0 p-2 rounded-lg w-full border-gray-300"
              />
              {errors.userName && (
                <p className="text-red-700 text-xs font-semibold mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register("password", {
                  required: "Please enter your password",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Invalid password. Must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.",
                  },
                })}
                type={!eyeCheck ? "password" : "text"}
                placeholder="Password"
                className="border-2 pr-8 text-sm select-none outline-0 p-2 rounded-lg w-full border-gray-300"
              />
              {errors.password && (
                <p className="text-red-700 text-xs font-semibold mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="absolute right-2 top-2.5 cursor-pointer">
                {eyeCheck ? (
                  <IoEyeOutline
                    size={20}
                    onClick={() => setEyeCheck((prev) => !prev)}
                  />
                ) : (
                  <IoEyeOffOutline
                    size={20}
                    onClick={() => setEyeCheck((prev) => !prev)}
                  />
                )}
              </div>
            </div>

            {/* reCAPTCHA */}
            <div>
              <Recaptcha setIsLoginGoogle={setIsLoginGoogle} />
            </div>
          </div>

          <div>
            {signUpMutation.isPending ? (
              <button
                className="bg-blue-500 p-2 w-full text-white cursor-pointer rounded-lg mt-5"
                type="submit"
                disabled={isLoginGoogle ? false : true}
              >
                <BeatLoader size={15} color="white" />
              </button>
            ) : (
              <button
                className="bg-blue-500 p-2 w-full text-white cursor-pointer rounded-lg mt-5"
                type="submit"
                disabled={isLoginGoogle ? false : true}
              >
                SignUp
              </button>
            )}
          </div>

          <div className="flex justify-center text-sm mt-2">
            <p>
              Already have an account?{" "}
              <span className="text-blue-500">
                <Link href="/login">Login</Link>
              </span>
            </p>
          </div>

          <div className="flex justify-center mt-3">
            <p className="or">Or</p>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <button className="flex relative items-center cursor-pointer justify-center border-2 p-2 rounded-lg border-gray-200 gap-x-2 w-full ">
              <FcGoogle size={20} className="absolute left-2" />
              <p className="text-sm">Login with Google</p>
            </button>
            <button className="flex items-center relative cursor-pointer justify-center border-2 p-2 rounded-lg border-gray-200 gap-x-2 w-full ">
              <SiFacebook size={19} color="blue" className="absolute left-2" />
              <p className="text-sm">Login with Facebook</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
