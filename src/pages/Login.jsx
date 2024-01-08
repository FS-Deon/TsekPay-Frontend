import React, { useState } from "react";

function Login() {
  const [work_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="../Fs-logo.png"
            alt="FullSuite Logo"
          />
          <h2 className="mt-0 mb-3 font-sans text-center text-l leading-9 tracking-tight text-gray-900">
            FullSuite
          </h2>
          <h2 className="mt-0 font-mono text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            HRI System: TSEKPAY
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-left justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0097B2] sm:text-sm sm:leading-6 p-2"
              />
              <div className="flex items-center mt-4 mb-4">
                <input
                  className="checkbox checkbox-sm mr-2"
                  id="check"
                  type="checkbox"
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label className="text-sm" htmlFor="check">
                  Show Password
                </label>
              </div>
            </div>
            <a href="#" className="text-sm left text-blue-800 hover:underline">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-md bg-[#0097B2] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#4A6E7E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
