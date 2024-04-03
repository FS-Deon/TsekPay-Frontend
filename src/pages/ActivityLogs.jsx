import { useState } from "react";

function ActivityLogs() {
  const [dataTable, setDataTable] = useState([]);

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold tracking-wide">
                Activity Logs
              </h1>
            </div>
            <div className="flex flex-col w-full items-end"></div>
          </div>
        </div>

        <div className="mt-5 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {dataTable ? (
            <table border="1" className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>
                  {/* Add more columns based on your data structure */}
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
              <tfoot>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ActivityLogs;
