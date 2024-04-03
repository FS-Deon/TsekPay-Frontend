import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserData = () => {
      const userDataCookie = Cookies.get("userData");

      if (!userDataCookie) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };

    checkUserData();
  }, [navigate]);

  useEffect(() => {
    // console.log("Ran");
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Sidebar />
          <div className="md:ml-64 flex flex-col">
            <Header />
            <div className="mt-2 p-2 md:mt-5 md:p-5">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
