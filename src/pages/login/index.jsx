import React from "react";
import { useTheme } from "next-themes";
import ThemeToggle from "../components/ThemeToggle";
import { BsSun } from "react-icons/bs";
import { useForm } from "react-hook-form";
function LoginPage() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const formSummmiting = () => {};
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="dark:bg-[#11131F] rounded-lg bg-white ">
        <div className="w-[300px] p-3 rounded-lg">
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-center">
              <button>
                {
                    
                }
                <BsSun />
              </button>
            </div>
            <div className="flex justify-center flex-col gap-2 items-center ">
              <p>Todo List</p>
              <p className="text-xs">
                Are you logined ? <span>SignUp</span>
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
              className="border-2 w-full p-2 rounded-lg outline-0 border-gray-500 text-sm"
              placeholder="Email or Username"
              {...register("identifier", {
                required: "Pleae enter a email or userName",
                validate: (value) => {
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  const isUsername = /^[a-z0-9_-]{3,15}$/.test(value);

                  if (!isEmail && !isUsername) {
                    return "Pleae write a correct email or userName";
                  }

                  return true;
                },
              })}
              type="text"
              name=""
              id=""
            />
            {errors.identifier && (
              <p className="text-red-600 font-semibold mt-1 text-xs">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div>
            <input
              className="border-2 w-full p-2 rounded-lg outline-0 border-gray-500 text-sm"
              placeholder="Password"
              {...register("identifier", {
                required: "Pleae enter a email or userName",
                validate: (value) => {
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  const isUsername = /^[a-z0-9_-]{3,15}$/.test(value);

                  if (!isEmail && !isUsername) {
                    return "Pleae write a correct email or userName";
                  }

                  return true;
                },
              })}
              type="text"
              name=""
              id=""
            />
            {errors.identifier && (
              <p className="text-red-600 font-semibold mt-1 text-xs">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div className="">
            <button className="bg-blue-700 p-2 rounded-lg w-full cursor-pointer">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
