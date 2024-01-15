import React, { useState } from "react";

function Login() {
  const [work_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div class="w-screen min-h-screen">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col shadow lg:w-[450px] w-[350px]">
            <h1 className="text-[20px] font-medium mx-8 my-6">Login</h1>
            <div class="relative z-0 mx-10 my-5">
              <input
                type="email"
                id="floating_standard"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_standard"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Enter your email address
              </label>
            </div>
            <div class="relative z-0 mx-10 my-5">
              <input
                type="email"
                id="floating_standard"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                for="floating_standard"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Enter your password
              </label>
            </div>

            <p className="text-[13px] text-[#002C74] mx-10">
              Forgot your password?
            </p>
            <div className="flex flex-col justify-center items-center py-5">
              <div class="flex items-center mb-3">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700"
                />
                <label for="default-checkbox" class="ms-2 text-[13px]">
                  Stay signed in for a week
                </label>
              </div>
              <button className="btn bg-[#5D93F0] w-[60%] btn-sm text-white">
                Continue
              </button>
              <p className="text-[13px] py-2">
                Don't have an account yet?{" "}
                <a className="link text-[#002C74] mx-1">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
