import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function TsekpayRun() {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <h1 className="m-5 px-5 text-3xl font-bold">Tsekpay Run</h1>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          <div className="flex flex-col container w-[20%] m-5">
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
              <input type="file" id="uploadFile1" class="hidden" />
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
          <div className="container w-[80%] flex flex-col">
            <h1 className="text-base font-bold">Period Covered</h1>
            <div className="flex flex-row">
              {" "}
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
        </div>
      </div>
    </>
  );
}

export default TsekpayRun;
