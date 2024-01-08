import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 flex flex-col">
        {/*greetings*/}
        <div className="mb-1 text-xl">January 8, 2024</div>
        <div className="m-2 text-3xl font-bold">
          <p>Good morning User</p>
        </div>
        {/*notices*/}
        <div className="flex lg:flex-row flex-col">
          <div className="flex flex-col">
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col items-center justify-center">
              <h1 className="text-xl font-semibold mb-4">
                Date of last upload
              </h1>
              <h1 className="text-[40px] font-black">December 05, 2023</h1>
              <p className="font-regular text-xl">16 Days Ago</p>
            </div>

            <button className="btn btn-outline">Default</button>
          </div>

          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700 flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold mb-4">Date of last upload</h1>
            <h1 className="text-[40px] font-black">December 05, 2023</h1>
            <p className="font-regular text-xl">16 Days Ago</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
