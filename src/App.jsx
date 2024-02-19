import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Dashboard,
  Register,
  NonRecurring,
  ActivityLogs,
  SelectOrg,
  TsekpayRun,
  ManageOrgs,
  PayItems,
} from "./pages";
import Layout from "./components/Layout";

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
              <Route path="/select-orgnazation" element={<SelectOrg />} />
              <Route path="/tsekpay-run" element={<TsekpayRun />} />
              <Route path="/manage-organizations" element={<ManageOrgs />} />
              <Route path="/manage-pay-items" element={<PayItems />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
