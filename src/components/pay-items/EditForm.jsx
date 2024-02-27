import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


function EditForm(props) {
  let response;

  const [payItem, setPayItem] = useState({
    id: props.payItemData.id,
    name : props.payItemData.name,
    category: props.payItemData.category
  });

  useEffect(()=>{
    console.log("PayItemDATA: ", props.payItemData);
  }, []);
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const updatePayItem = async (id) => {
    console.log(payItem);
    try {
      response = await axios.patch(
        `http://localhost:3000/pay-item/edit/${id}`,
        payItem, {
          headers: {
            Authorization: getToken(),
          },
      });
      if (response) {
        console.log("TRUE");
        setPayItem("");
        console.log("after", payItem);
      }
    } catch (error) {
      console.error("Error adding payable: ", error);
    }
  } 

  return (
    <>
      <button
        className="btn btn-sm btn-edit bg-[#426E80] shadow-md px-4 m-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
        onClick={() => document.getElementById(`edit-form-${props.payItemData.id}` ).showModal()}
      >
        Edit
      </button>

      <dialog id={`edit-form-${props.payItemData.id}`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-xl font-bold ">Edit Pay Item : {props.payItemID}</h1>
          <button className="ml-auto" onClick={() => document.getElementById(`edit-form-${props.payItemData.id}`).close()}>
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
                  name: e.target.value
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
                    category: e.target.value
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
                onClick={() => updatePayItem(props.payItemData.id) }
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default EditForm;
