import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 flex flex-col container">
        {/*greetings*/}
        <div className="mx-2 mb-1 text-xl">January 8, 2024</div>
        <div className="m-2 text-3xl font-bold">
          <p>Good morning User</p>
        </div>
        {/*notices*/}
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col lg:w-[30%]">
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold mb-4">
                Date of last upload
              </h1>
              <h1 className="text-[40px] font-black text-center">
                December <br />
                <span className="text-6xl">05,</span> <br /> 2023
              </h1>
              <p className="font-regular text-xl">16 Days Ago</p>
            </div>

            <button className="mx-2 px-3 btn btn-outline border-2 border-gray-200">
              Upload File
            </button>
          </div>

          <div className="m-2 p-3 border-2 lg:w-[70%] border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col">
            <h1>Important Dates</h1>
          </div>
        </div>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
          <h1 className="text-xl font-semibold">Activity Log</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">December 23, 2023</div>
                        <div className="text-sm opacity-50">19:30</div>
                      </div>
                    </div>
                  </td>
                  <td>Send Emails</td>

                  <th>
                    <button className="btn btn-default btn-xs">details</button>
                  </th>
                </tr>
                {/* row 2 */}
              </tbody>
              {/* foot */}
              <tfoot>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>

                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
