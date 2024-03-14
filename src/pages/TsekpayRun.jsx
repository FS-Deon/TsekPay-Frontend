import { useEffect, useRef, useState } from "react";
import NoRecord from "../components/NoRecord";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DropdownCompany from "../components/DropdownCompany.jsx";

function TsekpayRun() {
  const navigate = useNavigate();
  const userData = Cookies.get("userData");
  const accountID = JSON.parse(userData).id;

  const [companyID, setCompanyID] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({}); // Contains company name and address
  const [dbCategoryPayItem, setDatabase] = useState([]); // Contains all pay items for the current user
  const [categories, setCategories] = useState([]); // Categories(per company)
  const [reqInfo, setReqInfo] = useState([]); // Required Column Headers

  // Data
  const [dataUploaded, setDataUploaded] = useState([]); // Uploaded Spreadsheet data
  const [dataProcessed, setProcessedData] = useState([]); // Processed uploaded data with date
  const [Dates, setDates] = useState({}); // Dates
  //Selected Row
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    getCompanyPayItem(accountID);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  // Row selection handler
  const rowClick = (empID, data) => {
    const rowData = data.find((row) => row["Employee ID"] === empID);
    // rowData is the data of the selected row
    console.log("Selected Row Data:", rowData);
    setSelectedRow(rowData);
  };

  // Set pay items based on company selected
  const setCompanyPayItem = (id) => {
    const info = {};
    // Data from database
    const data = dbCategoryPayItem.filter((item) => item.company_id == id);
    console.log(data);
    const { company_name, address } = data[0];
    setCompanyInfo({ company_name, address });

    // Transform to category object
    const categoryPayItem = data.reduce((acc, item) => {
      const { category, name } = item;

      // Find the category array in the accumulator
      const categoryArray = acc[category];

      if (categoryArray) {
        // If the category exists, push the name to its array
        categoryArray.push(name);
      } else {
        // If the category doesn't exist, create a new array
        acc[category] = [name];
      }

      return acc;
    }, {});

    setCategories(categoryPayItem);
    setRequiredInformation(categoryPayItem);
  };

  // Set required information for updloaded data
  const setRequiredInformation = (categories) => {
    setReqInfo([
      "Employee ID",
      "Last Name",
      "First Name",
      "Middle Name",
      "Email",
      "Net Pay",
    ]);
    const totalCategory = [];

    Object.keys(categories).forEach((category) => {
      const values = categories[category];
      // Add "Total " + categoryName to the output array, capitalize the first letter of category name
      const formattedCategoryName = "Total " + category;
      totalCategory.push(formattedCategoryName);
    });
    let values = Object.values(categories).flatMap((obj) => obj);
    values = values.concat(totalCategory);
    setReqInfo((prevInfo) => [...prevInfo, ...values]);
  };

  //Upload file and check if it has the same columns with required information
  const uploadFile = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const headers = Object.keys(parsedData[0]);

      // Check if required information is equal to the the spreadsheet headers, sort them to make them have same content order
      const areEqual =
        JSON.stringify(headers.sort()) === JSON.stringify(reqInfo.sort());
      // console.log("Headers: ", headers);
      // console.log("Required Info: ", reqInfo);
      if (areEqual) {
        //Notification for successful upload
        toast.success("File Upload Successfully!", { autoClose: 3000 });
        setDataUploaded(parsedData);
        const dateAppended = appendDate(parsedData);
        const processedData = processData(dateAppended);
        setProcessedData(processedData);
      } else {
        //Notification for failed upload
        toast.success("File Upload Failed!", { autoClose: 3000 });
      }
    };
  };

  const companyChange = (selectedCompany) => {
    if (selectedCompany != null) {
      setCompanyPayItem(selectedCompany);
      setCompanyID(selectedCompany);
    }
  };

  const getCompanyPayItem = async (accountID) => {
    const token = getToken();
    await axios
      .get(`http://localhost:3000/pay-item/data/${accountID}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        const rows = response.data.rows;
        if (rows) {
          setDatabase(rows);
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  const appendDate = (data) => {
    const appended = data.map((i) => ({
      ...i,
      Dates,
    }));
    return appended;
  };

  const appendCompany = (data) => {
    const appended = data.map((i) => ({
      ...i,
      companyInfo,
    }));
    return appended;
  };

  // Groups Pay Items into categories and store it in Pay Items objext
  // Gets Total per category and put it in Totals object
  const processData = (data) => {
    // Iterate in data list
    data.forEach((item) => {
      const categoryTotal = {};
      const payItems = {};
      // Iterate in categories object
      Object.keys(categories).forEach((category) => {
        const categoryList = categories[category]; // Get categories
        const categoryObject = {};
        // Iterate in category list
        categoryTotal[category] = item["Total " + category];
        categoryList.forEach((clItem) => {
          // Check if item value for is undefined
          if (item[clItem] !== undefined) {
            categoryObject[clItem] = item[clItem]; // Put payitem to respective category
            delete item[clItem];
          }
        });
        delete item[`Total ` + category];
        payItems[category] = categoryObject;
      });
      item["Pay Items"] = payItems;
      item["Totals"] = categoryTotal;
    });
    console.log("Processed Data: ", data);
    return data;
  };

  const generatePDF = async () => {
    const data = appendCompany(dataProcessed);
    console.log("Data to Send: ", data);
    const token = getToken();
    await axios
      .post(`http://localhost:5000/generate-and-send`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        if (response) {
          console.log(true);
        }
      })
      .catch(function (error) {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="flex lg:flex-row flex-col justify-between">
        <h1 className="m-2 p-2 md:m-5 md:px-5 text-3xl font-bold">
          Tsekpay Run
        </h1>
        <div className="m-2 p-2 md:m-5 md:px-5 lg:mr-10 my-1 flex flex-col">
          <h3 className="text-[13px] font-regular text-white">Client</h3>
          <DropdownCompany companyID={companyChange}></DropdownCompany>
        </div>
      </div>

      <form className="flex lg:flex-row flex-col m-2 p-2 border-2 border-gray-200 border-solid rounded-lg">
        <div className="container flex flex-col lg:w-[75%]">
          <h1 className="text-base font-bold">Period Covered</h1>
          <div className="flex lg:flex-row flex-col">
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text font-medium text-sm">
                  Date From
                </span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setDates((prevPayrollDate) => ({
                    ...prevPayrollDate,
                    From: e.target.value,
                  }));
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text font-medium text-sm">Date To</span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  setDates((prevPayrollDate) => ({
                    ...prevPayrollDate,
                    To: e.target.value,
                  }));
                }}
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
              onChange={(e) => {
                setDates((prevPayrollDate) => ({
                  ...prevPayrollDate,
                  Payment: e.target.value,
                }));
              }}
            />
          </label>
        </div>
        <div className="divider md:divider-vertical lg:divider-horizontal "></div>
        <div className="flex flex-col  container lg:w-[25%] ">
          <label
            htmlFor="uploadFile1"
            className="btn bg-[#426E80] btn-wide shadow-md px-2 lg:px-4 m-2 my-2 text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
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
              onChange={uploadFile}
              id="uploadFile1"
              className="hidden"
              name="csvFile"
            />
          </label>
          <button
            type="button"
            className="btn bg-[#5C9CB7] btn-wide shadow-md px-4 m-2 "
            onClick={generatePDF}
          >
            Generate & Send Payslip
          </button>
        </div>
      </form>

      {selectedRow && (
        <div className=" flex flex-col">
          <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-10">
            <div className="bg-[#4A6E7E] text-white rounded-t-lg w-full flex flex-col">
              <h1 className="font-bold text-2xl py-3 mx-3">
                {selectedRow["First Name"]}
                &nbsp;
                {selectedRow["Middle Name"]}
                &nbsp;
                {selectedRow["Last Name"]}
              </h1>
              <div className="flex flex-col lg:flex-row my-3">
                <h2 className="mx-4">
                  <strong>Email: </strong>
                  {selectedRow["Email"]}
                </h2>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full">
                <h1 className="font-bold mx-3 mt-3">Pay Calculation</h1>

                {Object.entries(selectedRow["Pay Items"]).map(
                  ([category, payItems]) => (
                    <>
                      <hr className="mt-1"></hr>
                      <div
                        className="flex flex-row justify-between"
                        key={category}
                      >
                        <h1 className="font-bold mx-3 mt-3">{category}</h1>
                        <h1 className="font-bold mx-3 mt-3">Amount PHP</h1>
                      </div>
                      {Object.entries(payItems).map(([payItem, amount]) => (
                        <>
                          <hr className="mt-1"></hr>
                          <div
                            className="flex flex-row justify-between"
                            key={payItem}
                          >
                            <h1 className="mx-3 mt-3">{payItem}</h1>
                            <h1 className="mx-3 mt-3">{amount}</h1>
                          </div>
                        </>
                      ))}
                      <hr className="mt-1"></hr>
                      <div className="flex flex-row justify-between">
                        <h1 className="font-bold mx-3 mt-3">
                          Total {category}
                        </h1>
                        <h1 className="mx-3 mt-3">
                          {selectedRow["Totals"][category]}
                        </h1>
                      </div>
                    </>
                  )
                )}

                <hr className="mt-1"></hr>
                <div className="flex flex-row justify-between border-t-3">
                  <h1 className="font-bold mx-3 mt-3">Take Home Pay</h1>
                  <h1 className="mx-3 mt-3">{selectedRow["Net Pay"]}</h1>
                </div>
                <hr className="mt-1"></hr>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="m-5 px-5 text-l font-bold">Payroll File</h1>
      <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
        {dataUploaded.length > 0 ? (
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
                  {Object.keys(dataUploaded[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataUploaded.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </td>
                    {Object.values(row).map((value, index) => (
                      <td key={index}>
                        <button
                          onClick={() =>
                            rowClick(row["Employee ID"], dataProcessed)
                          }
                        >
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
