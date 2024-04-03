import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  checkAddress,
  checkCompanyName,
  checkCompanyTIN,
  showAlert,
} from "../../assets/global";

function EditForm(props) {
  let response;

  let data = {
    id: "",
    account_id: "",
    company_name: "",
    tin: "",
    address: "",
    logo: "",
  };
  const [formData, setFormData] = useState({
    id: props.row.id,
    account_id: props.row.account_id,
    company_name: props.row.company_name,
    tin: props.row.tin,
    address: props.row.address,
  });
  const [logo, setLogo] = useState(null);
  const [errors, setErrors] = useState(data);

  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0];
    setLogo(logoFile);
    setFormData({
      ...formData,
      logo: logoFile,
    });
  };

  const updateCompany = async (recordID) => {
    console.log("Form Data: ", formData);
    const form = new FormData();
    form.append("id", formData.id);
    form.append("account_id", formData.account_id);
    form.append("company_name", formData.company_name);
    form.append("tin", formData.tin);
    form.append("address", formData.address);
    form.append("logo", logo);

    let status = "";
    let message = "";
    try {
      let response = await axios.patch(`/company/edit/${recordID}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log("Record updated successfully!");
        props.action(props.accountID);
        // getCompanies(accountID);
        document.getElementById(`edit-form-${props.row.id}`).close();
        status = "success";
        message = "Record updated successfully!";
      } else {
        status = "error";
        message = "Failed to update record";
        console.error("Failed to update record");
      }
    } catch (error) {
      status = "error";
      message = "Error updating account";
      console.error("Error updating account: ", error);
    } finally {
      showAlert(status, message);
    }
  };

  //toggle button for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if the form is valid
    if (await isFormValid()) {
      //call the update function
      updateCompany(formData.id);
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

    //sets error message for company tin input
    if (name == "tin") {
      if (checkCompanyTIN(value) != "") {
        setErrors({
          ...errors,
          tin: checkCompanyTIN(value),
        });
      } else {
        setErrors({ ...errors, tin: "" });
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

    if (checkCompanyTIN(formData.tin) != "") {
      newErrors.tin = checkCompanyTIN(formData.tin);
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

  return (
    <>
      <button
        className="btn btn-sm btn-edit bg-[#426E80] shadow-md px-4 m-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80] w-20"
        onClick={() => {
          setFormData(props.row);
          document.getElementById(`edit-form-${props.row.id}`).showModal();
        }}
      >
        Edit
      </button>

      <dialog
        id={`edit-form-${props.row.id}`}
        className="modal sm:modal-middle"
      >
        <div className="modal-box">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold ">Edit Company</h1>

            <button
              className="m-r ml-auto"
              onClick={() =>
                document.getElementById(`edit-form-${props.row.id}`).close()
              }
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

          <form
            onSubmit={(e) => {
              handleSubmit(e, true);
            }}
          >
            <div className="flex flex-col w-full gap-2">
              {/* Company Name */}
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full">
                  <div className="label">
                    <span className="label-text">
                      Company Name<span className="text-red-500"> *</span>
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

              {/* Company TIN */}
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full">
                  <div className="label">
                    <span className="label-text">
                      TIN<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    className={`input input-bordered w-full ${
                      errors.tin && `input-error`
                    }`}
                    type="text"
                    name="tin"
                    value={formData.tin}
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                  {errors.tin && (
                    <span className="text-[12px] text-red-500">
                      {errors.tin}
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
                    onChange={(e) => {
                      handleLogoChange(e);
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
                    type="submit"
                  >
                    Save
                  </button>
                </div>
                <div className="flex flex-col w-full md:w-auto">
                  <button
                    className="btn flex w-full shadow-md"
                    onClick={() =>
                      document
                        .getElementById(`edit-form-${props.row.id}`)
                        .close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default EditForm;
