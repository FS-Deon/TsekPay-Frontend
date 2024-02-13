import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import BackButton from "../components/BackButton.jsx";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  let response = {};
  let userData = {};
  const [first_name, setFN] = useState("");
  const [middle_name, setMN] = useState("");
  const [last_name, setLN] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [account_type, setAccountType] = useState("");
  const [data_table, setDataTable] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      userData = JSON.parse(Cookies.get('userData'));
      if (!userData) {
        navigate('/login');
      }
      viewAccounts();
      setDataLoaded(true);
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  

  const addAccount = async () => {
    try {
      response = await axios.post("http://localhost:3000/account/", {
        email,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        password,
        account_type,
      });
      if (response) {
        console.log("TRUE");
      }
    } catch (error) {
      console.error("Error adding account: ", error);
    }
  };

  const viewAccounts = async () => {
    try {
      const token = userData?.token;
      response = await axios.get("http://localhost:3000/account/view/", {
        headers: {
          Authorization: token,
        },
      });
      const rows = response.data.rows;
      // Check if response is not null before updating state
      if (rows) {
        setDataTable(rows);
        console.log("Response:", rows);
        console.log("Data Table: ", rows);
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
    }
  };
  

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64 flex flex-col">
        <BackButton />
        <div className="m-2">
          <h1 className="text-3xl font-bold tracking-wide">
            Register Account
          </h1>
        </div>
        <form>
          {/* Personal Information */}
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
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
                  required
                  onChange={(e) => {
                    setFN(e.target.value);
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
                  required
                  onChange={(e) => {
                    setMN(e.target.value);
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
                  required
                  onChange={(e) => {
                    setLN(e.target.value);
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
                required
                onChange={(e) => {
                  setDOB(e.target.value);
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
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                    setPassword(e.target.value);
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
                onChange={(e) => {
                  setAccountType(e.target.value);
                }}
              >
                <option value="" hidden>
                  Account Type
                </option>
                <option>Manager</option>
                <option>Accountant</option>
              </select>
            </label>

             <input type="submit" value="Submit" className="btn w-64 flex flex-row" onClick={addAccount}/>

          </div>
        </form>
      </div>

      <div className="p-4 sm:ml-64 flex flex-col">
        <h1>Sample Component</h1>
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
                {/* Add more columns based on your data structure */}
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
                  <td>{row.account_type}</td>
                  {/* Add more cells based on your data structure */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available.</p>
        )}
      </div>

    </>
  );
}

export default Register;