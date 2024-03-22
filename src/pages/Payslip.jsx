import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Components
import DropdownCompany from "../components/DropdownCompany";
import NoCompanySelected from "../components/NoCompanySelected";

function Payslip() {
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [companyID, setCompanyID] = useState(null);
  const userData = Cookies.get("userData");

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      getPayslip(companyID);
    }
  }, []);

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const companyChange = (selectedCompany) => {
    setCompanyID(selectedCompany);
    getPayslip(selectedCompany);
  };

  const getPayslip = async (value_ID) => {
    try {
      if (value_ID != null && value_ID != undefined && value_ID != "") {
        const token = getToken();
        const response = await axios.get(
          `http://localhost:3000/payslip/view/${value_ID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const rows = response.data.rows;
        // Check if response is not null before updating state
        if (rows) {
          console.log(rows);
          setDataTable(rows);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };


  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold">Pay Slips</h1>
            </div>
          </div>
          <div className="flex-col">
            <DropdownCompany companyID={companyChange}></DropdownCompany>
          </div>
        </div>

        <div className="mt-5 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {companyID && dataTable ? (
            <table border="1" className="table  min-w-[800px]">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Dates</th>
                  <th>Payables</th>
                  <th>Totals</th>
                  <th>Net Salary</th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {row.id}
                    </td>
                    <td>
                      {row.first_name} {row.middle_name} {row.last_name}
                    </td>
                    <td>
                      <p className="font-bold">
                        Payment:
                      </p>
                      <p className="indent-5">
                       {row.dates["Payment"]}<br/>
                      </p>

                      <p className="font-bold">
                       From: 
                      </p>
                      <p className="indent-5">
                     {row.dates["From"]}<br/>
                      </p>

                      <p className="font-bold">
                      To: 
                      </p>
                      <p className="indent-5">
                      {row.dates["To"]}
                      </p>
                    </td>
                    <td>
                      {Object.entries(row.payables).map(([payableKey, payableValue]) => (
                        <div key={payableKey}>
                          <p className="mt-2 font-bold">{payableKey}:</p>
                          {Object.entries(payableValue).map(([key, value]) => (
                            <div key={key}>
                              <p className="indent-3 font-bold">{key}: <br/></p>
                              <p className="indent-5">{value}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </td>
                    <td>
                      {Object.keys(row.totals).map((key) => (
                        <div key = {key}>
                          <p className="font-bold">
                            {key} : <br/>
                          </p>
                          <p className="indent-3">
                            {row.totals[key]}
                          </p>
                        </div>
                      ))}
                    </td>
                    <td>{row.net_salary}</td>
                    {/* Add more cells based on your data structure */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoCompanySelected />
          )}
        </div>
      </div>
    </>
  );
}

export default Payslip;
