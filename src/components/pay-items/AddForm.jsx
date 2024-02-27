import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


function AddForm(props) {
  let response;
  console.log("Add Form Component: ", props.comp_id);
  const [payItem, setPayItem] = useState({
    company_id : "",
    name : "",
    category: ""
  });

  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const addPayItem = async () => {
    try {
      response = await axios.post(
        "http://localhost:3000/pay-item/",
        payItem, {
          headers: {
            Authorization: getToken(),
          },
      });
      if (response) {
        setPayItem("");
        console.log("after", payItem);
      }
    } catch (error) {
      console.error("Error adding payable: ", error);
    }
  } 

  return (
    <>
      {props.comp_id && (
        <button
          className="btn my-4 "
          onClick={() => document.getElementById("add-form").showModal()}
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
        
      )}

      <dialog id="add-form" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-xl font-bold ">Add Pay Item</h1>
          <button className="ml-auto" onClick={() => document.getElementById("add-form").close()}>
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
          <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
            <div className="label">
              <span className="label-text">
                Name<span className="text-red-500"> *</span>
              </span>
            </div>
            <input
              name="f_name"
              type="text"
              maxLength="100"
              className="input input-bordered w-full "
              required
              value={payItem.name}
              onChange={(e) => {
                setPayItem((prevPayItem) => ({
                  ...prevPayItem,
                  name: e.target.value,
                  company_id: props.comp_id
                }));
              }}
            />
          </label>

          <div className="flex flex-row">
            <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
              <div className="label">
                <span className="label-text">
                  Category <span className="text-red-500"> *</span>
                </span>
              </div>

              <input type="text" list="category"  
                className="border w-full max-w-xs"
                value={payItem.category}
                onChange={(e) => {
                  setPayItem((prevPayItem) => ({
                    ...prevPayItem,
                    category: e.target.value,
                    company_id: props.comp_id
                  }));
                }}
              />
              <datalist id="category">
                <option>Earnings</option>
                <option>Deduction</option>
              </datalist>
            </label>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-[#1EBE58] text-white"
                onClick={() => addPayItem() }
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>

    </>
  );
}

export default AddForm;
