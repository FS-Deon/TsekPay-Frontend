import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "/src/pages/Login.jsx";
import Dashboard from "/src/pages/Dashboard.jsx";
import Register from "/src/pages/Register.jsx";
import TsekpayRun from "/src/pages/TsekpayRun.jsx";
import NonRecurring from "/src/pages/NonRecurring.jsx";
import ActivityLogs from "/src/pages/ActivityLogs.jsx";
import SelectOrg from "./pages/SelectOrg.jsx";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tsekpay-run" element={<TsekpayRun />} />
            <Route path="/non-recurring" element={<NonRecurring />} />
            <Route path="/activity-logs" element={<ActivityLogs />} />
            <Route path="/select-orgnazation" element={<SelectOrg />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
