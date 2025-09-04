import { BsSun } from "react-icons/bs";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import Swal from "sweetalert2";
import { IoMoonOutline } from "react-icons/io5";
import useToggleTheme from "../../../hooks/useToggleTheme";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/router";
import Link from "next/link";

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

function RegisterUser() {
  const { trigger, isMutating } = useSWRMutation("/api/auth/reg", sendRequest);
  const [theme, setTheme] = useToggleTheme();

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
      if (result.status === 201) {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="dark:bg-[#11131F] max-sm:w-[320px] w-[400px] border-2 border-gray-300 dark:border-0 rounded-lg bg-white ">
        <div className="  p-3 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-3 ">
            <div className="flex justify-center">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <BsSun /> : <IoMoonOutline />}
              </button>
            </div>
            <div className="flex justify-center flex-col gap-2 items-center w-full ">
              <p>Todo List</p>
              <p className="text-xs">
                Are you logined ? 
                <span className="cursor-pointer">
                  <Link href='/login'>Login</Link>
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
              className={`border-2  w-full p-2 rounded-lg outline-0 ${
                errors.firstName
                  ? "border-red-700"
                  : "border-gray-300 dark:border-gray-500"
              }  text-sm`}
              placeholder="Firstname"
              {...register("firstName", {
                required: "Please enter your Firstname",
                pattern: {
                  value: /^[^\s._<>]+$/,
                  message:
                    "Firstname cannot contain spaces, dots (.), underscores (_), or angle brackets (<>)",
                },
                minLength: {
                  value: 2,
                  message: "Firstname must be at least 2 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Firstname cannot exceed 20 characters",
                },
              })}
              type="text"
            />
            {errors.firstName && (
              <p className="text-red-600 font-semibold w-[350px] mt-1 text-xs">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 w-full p-2 rounded-lg outline-0 ${
                errors.lastName
                  ? "border-red-700"
                  : " border-gray-300 dark:border-gray-500"
              }   text-sm`}
              placeholder="Lastname"
              {...register("lastName", {
                required: "Please enter your Lastname",
                pattern: {
                  value: /^[^\s._<>]+$/,
                  message:
                    "Lastname cannot contain spaces, dots (.), underscores (_), or angle brackets (<>)",
                },
                minLength: {
                  value: 2,
                  message: "Lastname must be at least 2 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Lastname cannot exceed 20 characters",
                },
              })}
              type="text"
            />
            {errors.lastName && (
              <p className="text-red-600 font-semibold w-[350px] mt-1 text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 w-full p-2 rounded-lg outline-0 ${
                errors.password
                  ? "border-red-700"
                  : " border-gray-300 dark:border-gray-500"
              }   text-sm`}
              placeholder="Password"
              {...register("password", {
                required: "Please enter your Password",
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
              <p className="text-red-600 font-semibold w-[350px] mt-1 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 w-full p-2 rounded-lg outline-0 ${
                errors.email
                  ? "border-red-700"
                  : "border-gray-300 dark:border-gray-500"
              }  text-sm`}
              placeholder="Email"
              {...register("email", {
                required: "Please enter your Email",
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message:
                    "Please enter a valid email address in the format: name@domain.com",
                },
              })}
              type="text"
            />
            {errors.email && (
              <p className="text-red-600 font-semibold w-[350px] mt-1 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              className={`border-2 w-full p-2 rounded-lg outline-0 ${
                errors.userName
                  ? "border-red-700"
                  : "border-gray-300 dark:border-gray-500"
              }  text-sm`}
              placeholder="Username"
              {...register("userName", {
                required: "Please enter your Userame",
                pattern: {
                  value: /^[a-z0-9_-]{2,15}$/,
                  message:
                    "Username must be 2-15 characters long and can only contain lowercase letters, numbers, underscores (_), and hyphens (-)",
                },
              })}
              type="text"
            />
            {errors.userName && (
              <p className="text-red-600 font-semibold w-[350px] mt-1 text-xs">
                {errors.userName.message}
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

export default RegisterUser;
