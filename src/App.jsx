import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  ManageAccounts,
  NonRecurring,
  ActivityLogs,
  TsekpayRun,
  ManageCompanies,
  PayItems,
  Payslip,
} from "./pages";
import Layout from "./components/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "./pages/Profile";

const getToken = () => {
  let userData =
    Cookies.get("userData") != undefined ? Cookies.get("userData") : "";
  if (userData != "") {
    return JSON.parse(Cookies.get("userData")).token;
  }
  return "";
};

axios.defaults.baseURL = "https://tsekpay-backend-c05c6ff983bf.herokuapp.com/";
axios.defaults.headers.common["Authorization"] = getToken();

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
              <Route path="/accounts" element={<ManageAccounts />} />
              <Route path="/non-recurring" element={<NonRecurring />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/tsekpay-run" element={<TsekpayRun />} />
              <Route path="/companies" element={<ManageCompanies />} />
              <Route path="/manage-pay-items" element={<PayItems />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payslip" element={<Payslip />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
