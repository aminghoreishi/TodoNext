import React from "react";
import { BsSun } from "react-icons/bs";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import Link from "next/link";
import { BeatLoader } from "react-spinners";

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const data = await response.json();

  // برگرداندن هم داده و هم وضعیت
  return {
    data,
    status: response.status,
    ok: response.ok,
  };
}

function LoginPage() {
  const { trigger, isMutating } = useSWRMutation(
    "/api/auth/login",
    sendRequest
  );

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const formSummmiting = async (data) => {
    try {
      const result = await trigger(data);
      console.log("Login successful:", result);
      if (result.ok) {
        route.replace("/");
      }
      if (result.status === 409) {
        Swal.fire({
          icon: "error",
          title: "this usermane is exits please use another email or userNmae",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="dark:bg-[#11131F] rounded-lg bg-white ">
        <div className="w-[400px] p-3 rounded-lg">
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-center">
              <button>
                <BsSun />
              </button>
            </div>
            <div className="flex justify-center flex-col gap-2 items-center ">
              <p>Todo List</p>
              <p className="text-xs">
                Create Accont
                <span className="cursor-pointer">
                  <Link href="/reg">Create</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <form
          className="p-3 flex flex-col gap-5"
          onSubmit={handleSubmit(formSummmiting)}
        >
          <div>
            <input
              className={`border-2 ${
                errors.identifier ? "border-red-700" : "border-gray-500"
              } w-full p-2 rounded-lg outline-0 border-gray-500 text-sm`}
              placeholder="Email or Username"
              {...register("identifier", {
                required: "Pleae enter a email or userName",
                validate: (value) => {
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  const isUsername = /^[a-z0-9_-]{3,15}$/.test(value);

                  if (!isEmail && !isUsername) {
                    return "Please enter a valid email (e.g., user@example.com) or username (3-15 characters, letters, numbers, _ or -)";
                  }
                  return true;
                },
              })}
              type="text"
            />
            {errors.identifier && (
              <p className="text-red-600 font-semibold w-[300px] mt-1 text-xs">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 w-full p-2 rounded-lg outline-0 ${
                errors.password ? "border-red-700" : "border-gray-500"
              } border-gray-500 text-sm`}
              placeholder="Password"
              {...register("password", {
                required: "Please enter your password",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character",
                },
              })}
              type="password"
            />
            {errors.password && (
              <p className="text-red-600 font-semibold w-[300px] mt-1 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="">
            {isMutating ? (
              <button
                disabled={true}
                type="button"
                className="bg-blue-700 transition-all active:scale-95  hover:bg-blue-800 p-2 rounded-lg w-full cursor-pointer text-white"
              >
                <BeatLoader color="white" size={10} />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-700 transition-all active:scale-95  hover:bg-blue-800 p-2 rounded-lg w-full cursor-pointer text-white"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
