import React, { useEffect, useState } from "react";
import axios from "axios";

import { checkAddress, checkCompanyName, showAlert } from "../../assets/global";

function AddForm(props) {
  let response;
  let data = {
    id: "",
    account_id: "",
    company_name: "",
    address: "",
    logo: "",
  };
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState(data);

  //toggle button for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid()) {
      //call the add function
      addCompany();
    }
  };

  //on change event for inputs
  const handleOnChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      account_id: props.accountID,
    });

    //sets error message for company name input
    if (name == "company_name") {
      if (checkCompanyName(value) != "") {
        setErrors({
          ...errors,
          company_name: checkCompanyName(value),
        });
      } else {
        setErrors({ ...errors, company_name: "" });
      }
    }

    //sets error message for address input
    if (name == "address") {
      if (checkAddress(value) != "") {
        setErrors({
          ...errors,
          address: checkAddress(value),
        });
      } else {
        setErrors({ ...errors, address: "" });
      }
    }
  };

  const isFormValid = async () => {
    let newErrors = {};

    if (checkCompanyName(formData.company_name) != "") {
      newErrors.company_name = checkCompanyName(formData.company_name);
    }

    if (checkAddress(formData.address) != "") {
      newErrors.address = checkAddress(formData.address);
    }

    // if (checkLastName(formData.logo) != "") {
    //   newErrors.logo = checkLastName(formData.logo);
    // }

    setErrors({ ...errors, ...newErrors });

    return Object.keys(newErrors).length == 0;
  };

  const addCompany = async () => {
    let status = "";
    let message = "";

    try {
      let response = await axios.post("/company", formData);
      if (response.status === 200) {
        status = "success";
        message = "Organization was added successfully.";
        props.action(props.accountID);
        // getCompanies(accountID);
        setFormData(data);
        document.getElementById("add-form").close();
      } else {
        status = "error";
        message = "Error adding account";
      }
    } catch (error) {
      status = "error";
      message = "Error adding account";
      console.error("Error adding account: ", error);
    } finally {
      showAlert(status, message);
    }
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          setFormData(data);
          document.getElementById("add-form").showModal();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add
      </button>

      <dialog id="add-form" className="modal sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Add Organization</h1>

            <button
              className="m-r ml-auto"
              onClick={() => document.getElementById("add-form").close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* <form onSubmit={handleSubmit}> */}
          <div className="flex flex-col w-full gap-2">
            {/* Organization Name */}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Organization Name<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.company_name && `input-error`
                  }`}
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.company_name && (
                  <span className="text-[12px] text-red-500">
                    {errors.company_name}
                  </span>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Address<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`input input-bordered w-full ${
                    errors.address && `input-error`
                  }`}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                />
                {errors.address && (
                  <span className="text-[12px] text-red-500">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>

            {/* Logo */}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full">
                <div className="label">
                  <span className="label-text">
                    Logo<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  className={`file-input file-input-bordered w-full ${
                    errors.logo && `file-input-error`
                  }`}
                  type="file"
                  name="logo"
                  value={formData.logo}
                  onChange={(e) => {
                    handleOnChange(e);
                  }}
                  accept="image/*"
                />
                {errors.logo && (
                  <span className="text-[12px] text-red-500">
                    {errors.logo}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex md:flex-row gap-2 mt-2 justify-end">
              <div className="flex flex-col w-full md:w-auto">
                <button
                  className="btn flex w-full bg-[#426E80] shadow-md text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-col w-full md:w-auto">
                <button
                  className="btn flex w-full shadow-md"
                  onClick={() => document.getElementById("add-form").close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </dialog>
    </>
  );
}

export default AddForm;
