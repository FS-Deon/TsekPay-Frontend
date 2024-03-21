import React, { useState } from "react";

//Components
import DropdownCompany from "../components/DropdownCompany";
import NoCompanySelected from "../components/NoCompanySelected";

function Payslip() {
  const [dataTable, setDataTable] = useState([]);
  const [companyID, setCompanyID] = useState(null);

  const companyChange = (selectedCompany) => {
    setCompanyID(selectedCompany);
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
            <table border="1" className="table">
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
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
