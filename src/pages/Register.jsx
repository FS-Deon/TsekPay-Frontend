import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BackButton from "../components/BackButton.jsx";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  let response;
  const userData = Cookies.get('userData');
  const [accountData, setAccountData] = useState({
    email : "",
    first_name : "",
    middle_name : "",
    lastName : "",
    date_of_birth: "",
    password : "",
    account_type : "",
  });
  const [data_table, setDataTable] = useState([]);
  const [rowSelected, setRowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    if(!userData){
      console.log("EMPTY");
      navigate('/login');
    }
    viewAccounts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get('userData'));
    return userData.token;
  };  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const addAccount = async () => {
    console.log(accountData);
    try {
      response = await axios.post("http://localhost:3000/account/", accountData
      );
      if (response) {
        console.log("TRUE");
      }
    } catch (error) {
      console.error("Error adding account: ", error);
    }
  };

  const viewAccounts = async () => {
    try {
      const token = getToken();
      response = await axios.get("http://localhost:3000/account/view/", {
        headers: {
          Authorization: token,
        },
      });
      const rows = response.data.rows;
      // Check if response is not null before updating state
      if (rows) {
        setDataTable(rows);
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
    }
  };

  const onClickEdit = (rowId) => {
    setSelectedRow(data_table.find((row) => row.id === rowId));
    setRowSelected(true);
  };
  const onClickClose = (rowId) => {
    setSelectedRow("");
    setRowSelected(false);
  };

  const updateAccount = async (recordID) => {
    try {
      const token = getToken();
      const response = await axios.patch(`http://localhost:3000/account/edit/${recordID}`, selectedRow, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        console.log("Record updated successfully!");
        // Additional logic if needed
      } else {
        console.error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating account: ", error);
    }
  };
  
  const deleteAccount = async (recordID) => {
    try{
      const token = getToken();
      response = await axios.delete(`http://localhost:3000/account/remove/${recordID}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        viewAccounts();
        console.log("Record deleted successfully!");
      } else {
        console.error("Failed to delete record");
      }
    } catch (error){
      console.error("Error viewing accounts: ", error);
    }
  };


  return (
    <>
      <Sidebar />

      <div className="w-full p-2 md:w-9/12 md:p-4 md:ml-64 flex flex-col">
        <BackButton />
        <div className="">
          <h1 className=" text-3xl font-bold tracking-wide">
            Create Account
          </h1>
          <form>
            {/* Personal Information */}
            <div className=" p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
              <div className="flex flex-col md:flex-row">
                {/* First Name */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      First Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    maxLength="100"
                    className="input input-bordered w-full "
                    required
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        first_name: e.target.value,
                      }));
                    }}
                  />
                </label>

                {/* Middle Name */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Middle Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="middleName"
                    type="text"
                    maxLength="100"
                    className="input input-bordered w-full "
                    required
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        middle_name: e.target.value,
                      }));
                    }}
                  />
                </label>

                {/* Last Name */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Last Name<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="lastName"
                    type="text"
                    maxLength="100"
                    className="input input-bordered w-full "
                    required
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        last_name: e.target.value,
                      }));
                    }}
                  />
                </label>
              </div>

              {/* Date of Birth */}
              <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                <div className="label">
                  <span className="label-text">
                    Date of Birth<span className="text-red-500"> *</span>
                  </span>
                </div>
                <input
                  name="dateOfBirth"
                  type="date"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => {
                    setAccountData((prevAccountData) => ({
                      ...prevAccountData,
                      date_of_birth: e.target.value,
                    }));
                  }}
                />
              </label>
              <div className="flex flex-col md:flex-row">
                {/* Email */}
                <label className="form-control w-full max-w-lg md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Email<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full "
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        email: e.target.value,
                      }));
                    }}
                  />
                </label>
                {/* Password */}
                <label className="form-control w-full max-w-lg md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Password <span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="password"
                    type="text"
                    className="input input-bordered w-full "
                    required
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        password: e.target.value,
                      }));
                    }}
                  />
                </label>
              </div>
              <div className="flex flex-col md:flex-row">
                {/* Account Type */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Account Type</span>
                  </div>
                  <select
                    name="accountType"
                    className="select select-bordered w-full"
                    required
                    onChange={(e) => {
                      setAccountData((prevAccountData) => ({
                        ...prevAccountData,
                        account_type: e.target.value,
                      }));
                    }}
                  >
                    <option value="" hidden>
                      Account Type
                    </option>
                    <option>Manager</option>
                    <option>Accountant</option>
                  </select>
                </label>
              </div>

              <div className="flex flex-col md:flex-row">
                <input type="submit" value="Create" className="btn w-64 flex flex-row" onClick={addAccount}/>
              </div>

            </div>
          </form>
        </div>

        <div className="">
          <h1 className="text-3xl font-bold tracking-wide">
            Records
          </h1>
          <div className="p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
            {data_table ? (
              <table border="1">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Account Type</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data_table.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.email}</td>
                      <td>{row.first_name}</td>
                      <td>{row.middle_name}</td>
                      <td>{row.last_name}</td>
                      <td>{row.account_type}</td><td>
                      <button
                        onClick={() => onClickEdit(row.id)}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteAccount(row.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </div>
        
        {rowSelected ?(
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-wide">
                Update Account
              </h1>
              <button className="m-r ml-auto"
                        onClick={() => onClickClose()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
        
            <form>
              {/* Personal Information */}
              <div className="p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
                <div className="flex flex-col md:flex-row">
                  {/* First Name */}
                  <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                    <div className="label">
                      <span className="label-text">
                        First Name<span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      name="f_name"
                      type="text"
                      maxLength="100"
                      className="input input-bordered w-full "
                      value = {selectedRow.first_name}
                      required
                      onChange={(e) => {
                        setSelectedRow((prevSelectedRow) => ({
                          ...prevSelectedRow,
                          first_name: e.target.value,
                        }));
                      }}
                    />
                  </label>

                  {/* Middle Name */}
                  <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                    <div className="label">
                      <span className="label-text">
                        Middle Name<span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      name="m_name"
                      type="text"
                      maxLength="100"
                      className="input input-bordered w-full "
                      value = {selectedRow.middle_name}
                      required
                      onChange={(e) => {
                        setSelectedRow((prevSelectedRow) => ({
                          ...prevSelectedRow,
                          middle_name: e.target.value,
                        }));
                      }}
                      
                    />
                  </label>

                  {/* Last Name */}
                  <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                    <div className="label">
                      <span className="label-text">
                        Last Name<span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      name="s_name"
                      type="text"
                      maxLength="100"
                      className="input input-bordered w-full "
                      value = {selectedRow.last_name}
                      required
                      onChange={(e) => {
                        setSelectedRow((prevSelectedRow) => ({
                          ...prevSelectedRow,
                          last_name: e.target.value,
                        }));
                      }}
                    />
                  </label>
                </div>

                {/* Date of Birth */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">
                      Date of Birth<span className="text-red-500"> *</span>
                    </span>
                  </div>
                  <input
                    name="dob"
                    type="date"
                    className="input input-bordered w-full"
                    value={formatDate(selectedRow.date_of_birth)}                
                    required
                    onChange={(e) => {
                      setSelectedRow((prevSelectedRow) => ({
                        ...prevSelectedRow,
                        date_of_birth: e.target.value,
                      }));
                    }}
                  />
                </label>

                <div className="flex flex-col md:flex-row">
                  {/* Personal Email */}
                  <label className="form-control w-full max-w-lg md:mb-0 md:mr-4">
                    <div className="label">
                      <span className="label-text">
                        Email<span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      name="email"
                      type="email"
                      className="input input-bordered w-full "
                      value = {selectedRow.email}
                      onChange={(e) => {
                        setSelectedRow((prevSelectedRow) => ({
                          ...prevSelectedRow,
                          email: e.target.value,
                        }));
                      }}
                    />
                  </label>
                  {/* Password */}
                  <label className="form-control w-full max-w-lg md:mb-0 md:mr-4">
                    <div className="label">
                      <span className="label-text">
                        Password <span className="text-red-500"> *</span>
                      </span>
                    </div>
                    <input
                      name="password"
                      type="text"
                      className="input input-bordered w-full "
                      onChange={(e) => {
                        setSelectedRow((prevSelectedRow) => ({
                          ...prevSelectedRow,
                          password: e.target.value,
                        }));
                      }}
                    />
                  </label>

                </div>
                {/* Account Type */}
                <label className="form-control w-full max-w-sm md:mb-0 md:mr-4">
                  <div className="label">
                    <span className="label-text">Account Type</span>
                  </div>
                  <select
                    name="account_Type"
                    className="select select-bordered w-full"
                    required

                    value = {selectedRow.account_type}
                    onChange={(e) => {
                      setSelectedRow((prevSelectedRow) => ({
                        ...prevSelectedRow,
                        account_type: e.target.value,
                      }));
                    }}
                  >
                    <option 
                      value = "" hidden>
                      Account Type
                    </option>
                    <option>Manager</option>
                    <option>Accountant</option>
                  </select>
                </label>

                <button className="btn w-64 flex flex-row" onClick={() => updateAccount(selectedRow.id)}>Update</button>

              </div>
            </form>
          </div>
          ) : (
            <p>No Row Selected</p>
          )
        }
      </div>

    </>
  );
}

export default Register;