import { useEffect, useRef, useState } from "react";
import NoRecord from "../components/NoRecord";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DropdownCompany from "../components/DropdownCompany.jsx";

function TsekpayRun() {
  const navigate = useNavigate();
  const userData = Cookies.get("userData");
  const accountID = JSON.parse(userData).id;
  const [companyID, setCompanyID] = useState(null);
  const [database, setDatabase] = useState([]);
  const [categories, setCategories] = useState([]);
  const [payItem, setPayItem] = useState({});

  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    console.log("ACCOUNT ID: ", accountID);
    getCompanyPayItem(accountID);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const [data, setData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  //const checkbox = useRef(null);

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

  console.log(data);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleNameClick = (rowData) => {
    // rowData is the data of the selected row
    console.log("Selected Row Data:", rowData);
    setSelectedRow(rowData);
  };

  const companyChange = (selectedCompany) => {
    if(selectedCompany != null){
      setCompanyPayItem(selectedCompany);
      setCompanyID(selectedCompany);
    }
  }
  
  const getCompanyPayItem = async (accountID) => {
    const token = getToken();
    await axios.get(`http://localhost:3000/pay-item/data/${accountID}`, {
      headers: {
        Authorization: token,
      },
    })
    .then(function(response){
      const rows = response.data.rows;
      console.log(response.data.rows);
      if (rows) {
        setDatabase(rows);
      }
    })
    .catch(function(error){
      console.error("Error: ", error);
    })
  }

  const setCompanyPayItem = (id) => {
    const data = database.filter((item) => item.company_id == id);

    // Transform the data array
    const transformedData = data.reduce((acc, item) => {
      const { category, name } = item;

      // Find the category object in the accumulator
      const categoryObject = acc.find(obj => obj[category]);

      if (categoryObject) {
        // If the category exists, push the name to its array
        categoryObject[category].push(name);
      } else {
        // If the category doesn't exist, create a new object
        acc.push({ [category]: [name] });
      }

      return acc;
    }, []);
    setCategories(transformedData);
    console.log("Categories: ", transformedData);
  }


  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="m-5 px-5 text-3xl font-bold">Tsekpay Run</h1>
        <div className="mr-10 my-1 flex flex-col">
          <h3 className="text-[13px] font-regular text-white">Client</h3>

          <DropdownCompany companyID = {companyChange}></DropdownCompany>

        </div>
      </div>

      <form className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
        <div className="flex flex-col container w-[25%] m-5">
          <label
            htmlFor="uploadFile1"
            className="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 my-2 text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 mr-2 fill-white inline"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload Payroll File
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              id="uploadFile1"
              className="hidden"
              name="csvFile"
            />
          </label>

          <button
            className="btn bg-[#5C9CB7] btn-wide shadow-md px-5 m-2  "
            disabled="disabled"
          >
            Payslip PDF Format
          </button>

          <button
            className="btn bg-[#5C9CB7] btn-wide shadow-md px-4 m-2 "
            disabled="disabled"
          >
            Send Payslip
          </button>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="container flex flex-col w-[75%]">
          <h1 className="text-base font-bold">Period Covered</h1>
          <div className="flex flex-row">
            <label className="form-control w-full max-w-xs mx-3">
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
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text font-medium text-sm">Date To</span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                disabled
              />
            </label>
          </div>
          <label className="form-control w-full max-w-xs mx-3">
            <div className="label">
              <span className="label-text font-medium text-sm">
                Payment Date
              </span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full max-w-xs"
              disabled
            />
          </label>
          <div className="flex justify-end">
            <button className="btn bg-[#1EBE58] text-white">Upload</button>
          </div>
        </div>
      </form>

      {selectedRow && (
        <div className=" flex flex-col">
          <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-10">
            <div className="bg-[#4A6E7E] text-white rounded-t-lg w-full flex flex-col">
              <h1 className="font-bold text-2xl py-3 mx-3">
                {selectedRow["Name"]}
              </h1>
              <div className="flex flex-col lg:flex-row my-3">
                <h2 className="mx-4">
                  <strong>Email: </strong>
                  {selectedRow["Email Address"]}
                </h2>
                <h2 className="mx-4">
                  <strong>Tax Number: </strong>
                  {selectedRow["Tin"]}
                </h2>
                <h2 className="mx-4">
                  <strong>Ordinary Rate: </strong>000000000000
                </h2>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full">
                <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Earnings</h1>
                  <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Basic Pay</h1>
                  <h1 className="mx-3 mt-3">{selectedRow["Basic Pay"]}</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">
                    Clothing and Laundry Allowance (de minimis)
                  </h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Clothing and Laundry Allowance (de minimis)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Meal Allowance (taxable)</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Meal Allowance (taxable)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Medical Allowance (De minimis)</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Medical Allowance (De minimis)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Medical Allowance (Taxable)</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Medical Allowance (Taxable)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Rice Allowance (De minimis)</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["RIce Allowance (De minimis)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Total Earnings</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Basic Pay"] +
                      selectedRow["Meal Allowance (taxable)"] +
                      selectedRow["Medical Allowance (De minimis)"] +
                      selectedRow["Medical Allowance (Taxable)"] +
                      selectedRow[
                        "Clothing and Laundry Allowance (de minimis)"
                      ] +
                      selectedRow["RIce Allowance (De minimis)"]}
                  </h1>
                </div>

                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Deductions</h1>
                  <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">SSS (every Payroll)</h1>
                  <h1 className="mx-3 mt-3">
                    {" "}
                    {selectedRow["SSS (every Payroll)"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">PHIC (every Payroll)</h1>
                  <h1 className="mx-3 mt-3">0</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">HDMF (every Payroll)</h1>
                  <h1 className="mx-3 mt-3">0</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Absences</h1>
                  <h1 className="mx-3 mt-3">{selectedRow["Absences"]}</h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="mx-3 mt-3">Salary Deduction</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Salary Deduction"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Total Deduction</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["SSS (every Payroll)"] -
                      selectedRow["Absences"] -
                      selectedRow["Salary Deduction"]}{" "}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                  <h1 className="mx-3 mt-3">
                    {selectedRow["Basic Pay"] +
                      selectedRow["Meal Allowance (taxable)"] +
                      selectedRow["Medical Allowance (De minimis)"] +
                      selectedRow["Medical Allowance (Taxable)"] +
                      selectedRow[
                        "Clothing and Laundry Allowance (de minimis)"
                      ] +
                      selectedRow["RIce Allowance (De minimis)"] -
                      selectedRow["SSS (every Payroll)"] -
                      selectedRow["Absences"] -
                      selectedRow["Salary Deduction"]}
                  </h1>
                </div>
                <hr className="mt-1"></hr>
              </div>
              {/* <div className="divider divider-horizontal"></div> */}
            </div>
          </div>
        </div>
      )}

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
                      />
                    </label>
                  </th>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
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
    </>
  );
}

export default TsekpayRun;
