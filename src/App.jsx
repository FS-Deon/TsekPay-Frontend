import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  Register,
  NonRecurring,
  ActivityLogs,
  TsekpayRun,
  ManageOrgs,
  PayItems,
} from "./pages";
import Layout from "./components/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "./pages/Profile";

const getToken = () => {
  let userData = (Cookies.get("userData") != undefined) ? Cookies.get("userData") : "";
  if(userData != ""){
    return JSON.parse(Cookies.get("userData")).token;
  }
  return "";
};

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.common['Authorization'] = getToken();

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/non-recurring" element={<NonRecurring />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/tsekpay-run" element={<TsekpayRun />} />
              <Route path="/manage-organizations" element={<ManageOrgs />} />
              <Route path="/manage-pay-items" element={<PayItems />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
