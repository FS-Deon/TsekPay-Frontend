import React from "react";

function AddPayItem() {
  return (
    <>
      <button
        className="btn my-4 "
        onClick={() => document.getElementById("anpi").showModal()}
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

      <dialog id="anpi" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-xl font-bold ">Add New Pay Item</h1>
          {/* First Name */}
          <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
            <div className="label">
              <span className="label-text">
                Pay Item Name<span className="text-red-500"> *</span>
              </span>
            </div>
            <input
              name="f_name"
              type="text"
              maxLength="100"
              className="input input-bordered w-full "
              required
            />
          </label>

          {/* Middle Name */}
          <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
            <div className="label">
              <span className="label-text">
                Description<span className="text-red-500"> *</span>
              </span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Describe this pay item"
            ></textarea>
          </label>

          {/* Surname */}
          <div className="flex flex-row">
            <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
              <div className="label">
                <span className="label-text">
                  Category <span className="text-red-500"> *</span>
                </span>
              </div>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  -Select-
                </option>
                <option>Allowance</option>
                <option>Wages</option>
              </select>
            </label>
            <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
              <div className="label">
                <span className="label-text">
                  Unit <span className="text-red-500"> *</span>
                </span>
              </div>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  -Select-
                </option>
                <option>Hour</option>
                <option>Day</option>
                <option>Month</option>
              </select>
            </label>
          </div>
          <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
            <div className="label">
              <span className="label-text">Visibility</span>
            </div>
            <div className="flex flex-row">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text px-2">On Payslip</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio-xs"
                    checked
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text px-2">Hidden</span>
                  <input type="radio" name="radio-10" className="radio-xs" />
                </label>
              </div>
            </div>
          </label>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn bg-[#1EBE58] text-white">Save</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default AddPayItem;
