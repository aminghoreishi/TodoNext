import Link from "next/link";
import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
function LoginPage() {
  const [eyeCheck, setEyeCheck] = useState(false);
  return (
    <div className="flex items-center min-h-screen justify-center">
      <form className="bg-white rounded-lg p-2 w-[400px]">
        <h1 className="text-center text-lg font-semibold">Login</h1>

        <div className="flex flex-col gap-3 mt-5">
          <div className="">
            <input
              type="text"
              placeholder="Email"
              className="border-2 text-sm outline-0 p-2 rounded-lg w-full border-gray-300"
            />
          </div>
          <div className="relative">
            <input
              type={!eyeCheck ? "password" : "text"}
              placeholder="Password"
              className="border-2 text-sm select-none outline-0 p-2 rounded-lg w-full border-gray-300"
            />
            <div className="absolute right-2 top-3 cursor-pointer">
              {eyeCheck ? (
                <IoEyeOutline
                  size={20}
                  onClick={() => setEyeCheck((pre) => !pre)}
                />
              ) : (
                <IoEyeOffOutline
                  size={20}
                  onClick={() => setEyeCheck((pre) => !pre)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="">
            <button className="bg-blue-500 p-2 w-full text-white cursor-pointer rounded-lg mt-5">Login</button>
        </div>
        <div className="flex justify-center text-sm mt-2">
            <p>Don't have an account? <span className="text-blue-500"><Link href="/reg">Signup</Link></span></p>
        </div>
        <div className="flex justify-center mt-3">
            <p className="or">Or</p>
        </div>
        <div className="mt-3 flex flex-col gap-3">
            <button className="flex relative items-center cursor-pointer justify-center border-2 p-2 rounded-lg border-gray-200 gap-x-2 w-full ">
                <FcGoogle size={20}  className="absolute left-2"/>
                <p className="text-sm">Login with Google</p>
            </button>
            <button className="flex items-center relative cursor-pointer justify-center border-2 p-2 rounded-lg border-gray-200 gap-x-2 w-full ">
                <SiFacebook size={19} color="blue" className="absolute left-2"/>
                <p className="text-sm">Login with FaceBook</p>
            </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
