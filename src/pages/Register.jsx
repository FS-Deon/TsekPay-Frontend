import { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  let response;
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
    const userData = Cookies.get("userData");
    if (!userData) {
      console.log("EMPTY");
      navigate("/login");
    }
    viewAccounts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

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

  const deleteAccount = async (recordID) => {
    try {
      const token = getToken();
      response = await axios.delete(
        `http://localhost:3000/account/remove/${recordID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        viewAccounts();
        console.log("Record deleted successfully!");
      } else {
        console.error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
    }
  };

  return (
    <>
      <div className="m-5">
        <BackButton />
        <div className="m-2">
          <h1 className="text-3xl font-bold tracking-wide">Register Account</h1>
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

            <input
              type="submit"
              value="Submit"
              className="btn w-64 flex flex-row"
              onClick={addAccount}
            />
          </div>
        </form>
        <div className="m-2">
          <h1 className="text-3xl font-bold tracking-wide">Records</h1>
        </div>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
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
                  <th>Edit</th>
                  <th>Delete</th>
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
                    <td>
                      <button
                        // onClick={() => handleEdit(row.id)}
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
                    {/* Add more cells based on your data structure */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
