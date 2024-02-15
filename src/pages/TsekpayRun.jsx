import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoRecord from "../components/NoRecord";
import { useState } from "react";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function TsekpayRun() {
  const navigate = useNavigate();

  useEffect(() => {
    const userAuthToken = Cookies.get("userData");
    if (!userAuthToken) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    console.log(userAuthToken);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const [data, setData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const checkbox = useRef(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const headers = parsedData.shift();
      setData(parsedData);
      setTableHeader(headers);
    };
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleNameClick = (rowData) => {
    // rowData is the data of the selected row
    console.log("Selected Row Data:", rowData);
    setSelectedRow(rowData);
  };

  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <div className="flex flex-row justify-between">
          <h1 className="m-5 px-5 text-3xl font-bold">Tsekpay Run</h1>
          <div className="mr-10 my-1 flex flex-col">
            <h3 className="text-[13px] font-regular text-white">Client</h3>
            <select className="select select-bordered w-full max-w-xs mx-2">
              <option>Fullsuite</option>
              <option>Ananda Spa</option>
              <option>Get Dentals</option>
            </select>
          </div>
        </div>

        <form className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-10 lg:flex-row">
          <div className="flex flex-col lg:w-[30%]">
            <h1 className="text-base font-bold">Upload Payroll File</h1>
            <div className="flex flex-col flex-1 mb-5 mx-5">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">
                    Upload Payroll File
                  </span>
                </div>
              </label>
              <div className="w-[80%] lg:w-full mx-auto">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  className="file:px-3 file-input file-input-bordered w-full mx-2 file:bg-[#426E80]"
                />
                <button
                  className="btn bg-[#5C9CB7] shadow-md px-5 m-2 w-full "
                  disabled="disabled"
                >
                  Payslip PDF Format
                </button>
                <button
                  className="btn bg-[#5C9CB7] shadow-md px-4 m-2 w-full"
                  disabled="disabled"
                >
                  Send Payslip
                </button>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="container flex flex-col">
            <h1 className="text-base font-bold">Period Covered</h1>
            <div className="flex flex-col gap-3 lg:flex-row items-center">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date From
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
              <label className="form-control w-full max-w-xs break-after-column">
                <div className="label">
                  <span className="label-text font-medium text-sm">
                    Date To
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-medium text-sm text-left">
                    Payment Date
                  </span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                  disabled
                />
              </label>
            </div>
            <div className="flex justify-center sm:justify-end mt-5">
              <button className="btn bg-[#1EBE58] text-white">Upload</button>
            </div>
          </div>
        </form>
      </div>

      <div className="sm:ml-64 flex flex-col">
        <h1 className="m-5 px-5 text-l font-bold">Payroll File</h1>
        <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          {data.length > 0 ? (
            <div className="overflow-x-auto overflow-scroll h-[55vh]">
              <table className="table table-xs">
                <thead className="bg-[#4A6E7E] text-white sticky top-0">
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox bg-[#fff] my-2"
                          checked={selectAll}
                          onChange={() => {
                            setSelectAll((current) => !current);
                          }}
                        />
                      </label>
                    </th>
                    {Object.values(tableHeader).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <th>
                        <label>
                          <input
                            ref={checkbox}
                            type="checkbox"
                            className="checkbox"
                            checked={selectAll ? true : null}
                          />
                        </label>
                      </th>
                      {Object.values(row).map((value, index) => (
                        <td key={index}>
                          <button onClick={() => handleNameClick(row)}>
                            {value}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoRecord></NoRecord>
          )}
        </div>
      </div>
      {selectedRow && (
        <div className="sm:ml-64 flex flex-col">
          <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-10">
            <div className="bg-[#4A6E7E] text-white rounded-t-lg w-full flex flex-col">
              <h1 className="font-bold text-2xl py-3 mx-3">{selectedRow[2]}</h1>
              <div className="flex flex-col lg:flex-row my-3">
                <h2 className="mx-4">
                  <strong>Email: </strong>
                  {selectedRow[18]}
                </h2>
                <h2 className="mx-4">
                  <strong>Tax Number: </strong>
                  {selectedRow[6]}
                </h2>
                <h2 className="mx-4">
                  <strong>Ordinary Rate: </strong>000000000000
                </h2>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-[25%]">
                <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Earnings</h1>
                  <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Basic Pay</h1>
                  <h1 className="mx-3 mt-3">9,000</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Total Earnings</h1>
                  <h1 className="mx-3 mt-3">9,000</h1>
                </div>
                <hr className="mt-1"></hr>

                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Deductions</h1>
                  <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Company Deductions</h1>
                  <h1 className="mx-3 mt-3">2,954</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Late & Absences</h1>
                  <h1 className="mx-3 mt-3">750</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Total Deduction</h1>
                  <h1 className="mx-3 mt-3">3,704</h1>
                </div>
                <hr className="mt-1"></hr>
              </div>
              {/* <div className="divider divider-horizontal"></div> */}
              <div className="overflow-x-auto w-full lg:w-[75%]">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Pay Items</th>
                      <th>Rate</th>
                      <th>QTY</th>
                      <th>Ammount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>Basic Pay</th>
                      <td>10,000.00</td>
                      <td>1</td>
                      <td>10,000.00</td>
                      <td>
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
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:ml-64 flex flex-col"></div>

      {/* <div className="sm:ml-64 flex flex-col">
        <NoRecord></NoRecord>
      </div> */}
    </>
  );
}

export default TsekpayRun;
