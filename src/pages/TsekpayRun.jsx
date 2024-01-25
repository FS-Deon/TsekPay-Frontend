import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoRecord from "../components/NoRecord";

function TsekpayRun() {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <h1 className="m-5 px-5 text-3xl font-bold">Tsekpay Run</h1>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          <div className="flex flex-col container w-[20%] m-5">
            <button className="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 text-white hover:bg-[#AAE2EC] hover:text-[#426E80]">
              Upload Payroll File
            </button>
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
              <label className="form-control w-full max-w-xs mx-3">
                <div className="label">
                  <span className="label-text">Date From</span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs mx-3">
                <div className="label">
                  <span className="label-text">Date To</span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <label className="form-control w-full max-w-xs mx-3">
              <div className="label">
                <span className="label-text">Payment Date</span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="sm:ml-64 flex flex-col">
        <h1 className="m-5 px-5 text-l font-bold">Payroll File</h1>
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
            <NoRecord></NoRecord>
          </div>
      </div>

      {/* <div className="sm:ml-64 flex flex-col">
        <NoRecord></NoRecord>
      </div> */}
    </>
  );
}

export default TsekpayRun;
