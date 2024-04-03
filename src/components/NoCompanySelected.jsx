import React from "react";
import NoRecordUploadedSVG from "./src/assets/records.svg";


function NoCompanySelected() {
  return (
    <div className=" flex flex-col justify-center w-full p-10">
      <img
        className="h-[200px]"
        src={NoRecordUploadedSVG}
        alt="No Record Uploaded"
      />
      <div>
        <h1 className="text-center pt-4 text-[#4A6E7E]">No Company Selected</h1>
      </div>
    </div>
  );
}

export default NoCompanySelected;
