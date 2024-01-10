import React from "react";
import Sidebar from "../components/Sidebar";

function ActivityLogs() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 flex flex-col container">
        <div className="m-2 text-3xl font-bold">
          <p>Activity Logs</p>
        </div>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
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

export default ActivityLogs;
