import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import BackButton from '../components/BackButton.jsx'

function Register() {
  return (
    <> 
    <Sidebar>
    </Sidebar>
        
        <div className="p-4 sm:ml-64 flex flex-col">
          <BackButton></BackButton>
          <div className="m-2">
            <h1 className="text-3xl font-bold tracking-wide">
              Register New Accountant
            </h1>
          </div>
          <form>
            {/* Personal Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg  flex flex-1 flex-col">
              <h1 className="font-bold">Personal Information</h1>

              <div className="flex flex-col md:flex-row">
                {/* First Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      First Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="f_name"
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Middle Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Middle Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="m_name"
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Surname */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Surname<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="s_name"
                    type="text"
                    maxlength="100"
                    className="input input-bordered w-full "
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Date of Birth */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date of Birth<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="dob"
                    type="date"
                    className="input input-bordered w-full"
                    required
                  />
                </label>

                {/* Civil Status */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Civil Status</span>
                  </div>
                  <select
                    name="civil_status"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" hidden>
                      Select Civil Status
                    </option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Widowed</option>
                  </select>
                </label>

                {/* Sex */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Sex<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="sex"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" hidden>
                      Select Sex
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </label>

                {/* Gender */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    name="gender"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Permanent Address */}
                <label className="form-control w-full max-w-5xl md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Permanent Address<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="p_address"
                    name="p_address"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Current Address */}
                <label className="form-control w-full max-w-5xl md:mb-0 md:mr-4">
                  <div className="label pb-0">
                    <span className="label-text">
                      Current Address<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <div className="flex items-center ">
                    <label className="label cursor-pointer">
                      <input
                        id="same_address_checkbox"
                        name="c_address"
                        type="checkbox"
                        value=""
                        className="checkbox checkbox-sm"
                      />
                      <span className="label-text ml-2">
                        Same as Permanent Address
                      </span>
                    </label>
                  </div>
                  <input
                    id="c_address"
                    name="c_address"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            {/* Contact Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
              <h1 className="font-bold">Contact Information</h1>

              <div className="flex flex-col md:flex-row">
                {/* Personal Email */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Personal Email<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="personal_email"
                    type="email"
                    className="input input-bordered w-full "
                  />
                </label>
                {/* Contact Number */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Contact Number<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="contact_num"
                    type="number"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
              <div className="divider"></div>
              <p className="font-semibold text-red-500 text-sm">
                Emergency Contact Information
              </p>
              <div className="flex flex-col md:flex-row">
                {/* Name */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Name</span>
                  </div>
                  <input
                    name="emergency_contact_name"
                    // onChange={handleChange}
                    type="text"
                    className="input input-bordered w-full "
                  />
                </label>

                {/* Number */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Contact Number</span>
                  </div>
                  <input
                    name="emergency_contact_num"
                    type="number"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>
            </div>

            {/* Employee Information */}
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
              <h1 className="font-bold mb-2">Employee Information</h1>

              <div className="flex flex-col w-full md:flex-row">
                {/* Employee ID */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employee ID
                      <span id="emp_num_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <div className="flex">
                    <select
                      id="company_id"
                      name="company_id"
                      className="select select-bordered w-32"
                      required
                    >
                      <option value="" hidden>
                        Company
                      </option>
                      <option value="op1">op1</option>
                      <option value="op2">op2</option>

                    </select>

                    <input
                      id="emp_num"
                      name="emp_num"
                      type="text"
                      maxlength="100"
                      className="input input-bordered w-full "
                    />
                  </div>
                </label>

                {/* Work Email */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Work E-mail
                      <span id="work_email_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <input
                    id="work_email"
                    name="work_email"
                    maxlength="100"
                    type="email"
                    className="input input-bordered w-full "
                    required
                  />
                </label>
              </div>

              <div className="flex flex-col w-full md:flex-row">
                {/* Division */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Division
                      <span id="division_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="div_id"
                    name="div_id"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" hidden>
                      Select Division
                    </option>
                   <option value="dop1" >dop1</option>
                   <option value="dop2">dop2</option>
                  </select>
                </label>

                {/* Department */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Department
                      <span id="department_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="dept_id"
                    name="dept_id"
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Department
                    </option>
                      <option value="ddpop1">ddpop1</option>
                      <option value="ddpop2">ddpop2</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col w-full md:flex-row">
                {/* Client/Cluster */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Client/Cluster
                      <span id="emp_num_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="client_id"
                    name="client_id"
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Client/Cluster
                    </option>
                      <option value="cc1">ccop1</option>
                      <option value="cc2">ccop2</option>
                  </select>
                </label>

                {/* Positions */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Position
                      <span id="department_label" className="text-red-500">
                        *
                      </span>
                    </span>
                  </div>
                  <select
                    id="position_id"
                    name="position_id"
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Position
                    </option>
                    
                      <option value="ppop1">ppop1</option>
                      <option value="ppop1">ppop2</option>
                  </select>
                </label>
              </div> 

              <div className="flex flex-col w-full md:flex-row">
                {/* Employment Status */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employment Status<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="emp_status"
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Employment Status
                    </option>
                    <option>Probationary</option>
                    <option>Regular</option>
                    <option>Part-time</option>
                  </select>
                </label>

                {/* Employee Role */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Employment Role<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <select
                    name="emp_role"
                    className="select select-bordered w-full "
                    required
                  >
                    <option value="" hidden>
                      Select Employment Role
                    </option>
                    <option value="3">Manager</option>
                    <option value="2">Regular Employee</option>
                    <option value="1">HR</option>
                    <option value="0">Administrator</option>
                  </select>
                </label>
              </div> 

              <div className="flex flex-col md:flex-row">
                {/* Date Hired */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date Hired<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="date_hired"
                    name="date_hired"
                    type="date"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Date of Regularization */}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date of Regularization
                      <span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    id="date_regularization"
                    name="date_regularization"
                    type="date"
                    className="input input-bordered w-full "
                    required
                  />
                </label>

                {/* Date Separated*/}
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Date Separated</span>
                  </div>
                  <input
                    name="date_separated"
                    type="date"
                    className="input input-bordered w-full "
                  />
                </label>
              </div>

              <div className="divider"></div>

              <div className="flex flex-col md:flex-row">
                <label className="form-control w-full max-w-md md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Upload Profile Picture</span>
                  </div>
                  <input
                    name="emp_pic"
                    type="file"
                    accept="image/*"
                    className="file-input w-full max-w-xs"
                  />
                </label>
              </div>

              <div className="divider"></div>
            </div>
            <div className="flex justify-end m-2">
              <input type="submit" value="Submit" className="btn" />
            </div> 
          </form>
        </div>
      </>
  )

}

export default Register;