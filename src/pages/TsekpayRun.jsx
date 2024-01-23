import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function TsekpayRun() {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <h1 className="m-2 text-3xl font-bold">Tsekpay Run</h1>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row">
          <div>1</div>
          <div className="divider divider-horizontal"></div>
          <div>
            <h1 className="text-base font-bold">Period Covered</h1>
          </div>
        </div>
      </div>

      <div className="sm:ml-64 flex flex-col">
        <h1 className="m-2 text-3xl font-bold font-black">Payroll File</h1>
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row">
           
          </div>
      </div>
    </>
  );
}

export default TsekpayRun;
