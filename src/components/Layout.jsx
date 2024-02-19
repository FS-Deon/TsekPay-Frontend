import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <Sidebar />
        <div className="sm:ml-64 flex flex-col">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
