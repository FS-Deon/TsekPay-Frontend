import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const userData = JSON.parse(Cookies.get("userData"));
  const fullName =
    userData.first_name + " " + userData.middle_name + " " + userData.last_name;
  const accountType = userData.account_type;
  const [showSideBar, setShowSideBar] = useState(false);

  const handleLogout = async () => {
    try {
      Cookies.remove("userData");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSideBar = () => {
    setShowSideBar((current) => !current);
  };

  return (
    <>
      <div
        className="absolute right-[0] mt-5 mr-5 md:hidden"
        onClick={toggleSideBar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0 ${
          showSideBar ? "translate-x-0" : "translate-x-[-100%]"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#4A6E7E]">
          <ul className="space-y-2 font-medium">
            <div className="flex flex-col items-center justify-center">
              <div>
                <div className="flex justify-center mt-5  mb-5">
                  <div className="h-28 w-28 bg-gray-500 rounded-full flex justify-center items-center text-5xl text-white font-medium m-2 ring-2 ring-white">
                    <img
                      className="h-28 w-28 rounded-full m-2 ring-2 ring-white object-cover"
                      src="https://ca.slack-edge.com/TKUG58KSM-U05Q1FLRFD5-f6ce66c37ee4-512"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="font-bold text-xl text-white">{fullName}</div>
                  <div className="mb-1 text-center text-white">
                    {accountType}
                  </div>
                  <div>
                    {/* to change */}
                    <Link
                      to="/profile"
                      className="mb-12 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5 "
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-white">Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ml-3 text-white">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tsekpay-run"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z"
                    clipRule="evenodd"
                  />
                  <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Tsekpay Run
                </span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-800 rounded-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/manage-pay-items"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path d="M15 3.75H9v16.5h6V3.75ZM16.5 20.25h3.375c1.035 0 1.875-.84 1.875-1.875V5.625c0-1.036-.84-1.875-1.875-1.875H16.5v16.5ZM4.125 3.75H7.5v16.5H4.125a1.875 1.875 0 0 1-1.875-1.875V5.625c0-1.036.84-1.875 1.875-1.875Z" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Pay Items
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/companies"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Companies
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/payslip"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Payslips
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/accounts"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Accounts
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/activity-logs"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Activity Logs
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="mt-12 flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-800 group"
                onClick={handleLogout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap text-white">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
