import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuthToken = Cookies.get("userData");
    if (userAuthToken) {
      // Redirect to the login page if there is no cookie
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/account/authenticate/",
        {
          email,
          password,
        }
      );
      const userData = {
        token: response.data.token,
        id: response.data.id,
        email: response.data.email,
        first_name: response.data.first_name,
        middle_name: response.data.middle_name,
        last_name: response.data.last_name,
        account_type: response.data.account_type,
      };
      axios.defaults.headers.common["Authorization"] = `${userData.token}`;
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
      setLoginStatus("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setLoginStatus("Login failed");
      console.error("Login error:", error);
    }
  };

  const iconButton = () => {
    return (
      <div>
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="flex-1 bg-login-bg bg-no-repeat bg-cover bg-center relative sm:md:hidden lg:inline-block">
          <div className="absolute h-screen w-full bg-gradient-to-r from-[#ffffff00] to-[#007184]"></div>
          <span className="p-2 bottom-0 absolute text-[10px] text-slate-200">
            <a href="https://www.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_40871274.htm#query=office&position=0&from_view=search&track=sph&uuid=069dd47e-247d-4a92-9a8e-468f946c5d4a">
              Image by atlascompany
            </a>{" "}
            on Freepik
          </span>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center h-screen bg-[#007184] w-full md:w-full lg:w-2/5">
          <img src="../logo-full.svg" alt="FullSuite logo" className="h-20" />
          <div className="card bg-base-100 shadow-xl p-5 w-80">
            <h1 className="font-bold text-2xl text-center">Tsekpay </h1>
            <div className="flex flex-col justify-center items-center gap-3 mt-7 mb-5">
              <input
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input input-bordered w-full border-gray-300 focus:outline-none"
                placeholder="Work Email"
              />
              <div className="flex flex-row justify-center items-center w-full gap-1 border-gray-300 border rounded-lg pr-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="input input-bordered w-full border-transparent focus:outline-none"
                  placeholder="Password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="btn btn-circle btn-ghost btn-sm"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {iconButton()}
                </button>
              </div>
              <a
                href="/forgot-password"
                className="text-[12px] text-[#007184] font-bold text-left w-full"
              >
                Forgot password?
              </a>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn normal-case bg-[#007184] text-[#FFFFFF] hover:bg-[#14383E]"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
