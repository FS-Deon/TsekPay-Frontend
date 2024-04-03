import React from 'react'

function EmployeePayItem() {
  return (
    <div className=" border-2 border-gray-200  border-solid rounded-lg flex flex-row mx-10"> 
    <div className="bg-[#4A6E7E] rounded-t-lg w-screen p-4 flex flex-col">
      <h1 className=" text-white text-3xl font-bold " contentEditable={true}>Employee Name</h1>

      <div className="flex  justify-start gap-10 text-white pt-4">
          <div>
            <span className="font-bold">Email:</span> employeeem@fullsuite.ph
          </div>

          <div>
          <span className="font-bold">TIN:</span> 000000000000

          </div>

          <div>
          <span className="font-bold">Ordinary Rate:</span> 000000000000

          </div>
      </div>

    </div>
    
  </div>


  )
}

export default EmployeePayItem