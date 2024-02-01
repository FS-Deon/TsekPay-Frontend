import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoRecord from "../components/NoRecord";
import { useState } from "react";
import * as XLSX from "xlsx";

function TsekpayRun() {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(
        excelFile,

        { type: "buffer" }
      );
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 13));
    }
  };
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <h1 className="m-5 px-5 text-3xl font-bold">Tsekpay Run</h1>

        {typeError && (
          <div className="alert alert-danger" role="alert">
            {typeError}
          </div>
        )}

        <form
          className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10"
          onSubmit={handleFileSubmit}
        >
          <div className="flex flex-col container w-[25%] m-5">
            <label
              for="uploadFile1"
              class="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 mr-2 fill-white inline"
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
                id="uploadFile1"
                className="form-control hidden"
                required
                onChange={handleFile}
              />
            </label>

            <button
              className="btn bg-[#5C9CB7] btn-wide shadow-md px-4 m-2  "
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
              <button className="btn bg-[#1EBE58] text-white">Save</button>
            </div>
          </div>
        </form>
      </div>

      <div className="sm:ml-64 flex flex-col">
        <h1 className="m-5 px-5 text-l font-bold">Payroll File</h1>
        <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          {excelData ? (
            <div className="overflow-x-auto overflow-scroll h-[55vh]">
              <table className="table ">
                {/* head */}
                <thead className="bg-[#4A6E7E] text-white sticky top-0">
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox bg-white"
                          />
                        </label>
                      </th>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
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
      <div className="sm:ml-64 flex flex-col">
        <div className="m-2 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          <div className="bg-[#4A6E7E] text-white w-full flex flex-col">
            <h1 className="font-bold text-2xl py-3 mx-3">Employee Name</h1>
            <div className="flex flex-row">
              <h2 className="mx-4">
                <strong>Email: </strong>employee@fullsuite
              </h2>
              <h2 className="mx-4">
                <strong>Tax Number: </strong>000000000000
              </h2>
              <h2 className="mx-4">
                <strong>Ordinary Rate: </strong>000000000000
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="sm:ml-64 flex flex-col">
        <NoRecord></NoRecord>
      </div> */}
    </>
  );
}

export default TsekpayRun;
