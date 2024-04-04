import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import BackButton from "../components/BackButton.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddForm from "../components/accounts/AddForm.jsx";
import EditForm from "../components/accounts/EditForm.jsx";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  let response;
  const userData = Cookies.get("userData");
  const [accountData, setAccountData] = useState({
    email: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    password: "",
    account_type: "",
  });
  const [dataTable, setDataTable] = useState([]);
  const [rowSelected, setRowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      getAccounts();
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getAccounts = async () => {
    try {
      response = await axios.get("/account/view/");
      const rows = response.data.rows;
      // Check if response is not null before updating state
      if (rows) {
        setDataTable(rows);
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
    }
  };

  const toggleDelete = (rowID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#Cc0202",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        //delete account
        deleteAccount(rowID);
      }
    });
  };

  const showAlert = (status, title) => {
    Swal.fire({
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const onClickClose = (rowId) => {
    setSelectedRow("");
    setRowSelected(false);
  };

  const updateAccount = async (recordID) => {
    console.log(selectedRow);
    try {
      const token = getToken();
      const response = await axios.patch(
        `/account/edit/${recordID}`,
        selectedRow,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        console.log("Record updated successfully!");
        // Additional logic if needed
        setRowSelected(false);
        getAccounts();
      } else {
        console.error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating account: ", error);
    }
  };

  const deleteAccount = async (recordID) => {
    let status = "";
    let message = "";
    try {
      const token = getToken();
      response = await axios.delete(
        `/account/remove/${recordID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // getAccounts();
        setDataTable((data) => data.filter((u) => u.id !== recordID));
        status = "success";
        message = "Record deleted successfully!";
      } else {
        status = "error";
        message = "Failed to delete record";
        console.error("Failed to delete record");
      }
    } catch (error) {
      status = "error";
      message = "Failed to delete record";
      console.error("Error viewing accounts: ", error);
    } finally {
      showAlert(status, message);
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold tracking-wide">Accounts</h1>
            </div>
            <div className="flex flex-col w-full items-end">
              <AddForm
                action={() => {
                  getAccounts();
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {dataTable ? (
            <table border="1" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Account Type</th>
                  <th className="w-40">Actions</th>
                  {/* Add more columns based on your data structure */}
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.email}</td>
                    <td>{row.first_name}</td>
                    <td>{row.middle_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.account_type}</td>
                    <td>
                      <div className="flex justify-between gap-2">
                        <EditForm
                          action={() => {
                            getAccounts();
                          }}
                          accountID={row.id}
                          account={row}
                        />
                        <button
                          onClick={() => toggleDelete(row.id)}
                          className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                        >
                          Delete
                        </button>
                      </div>
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

        {rowSelected ? (
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold mx-3">Update Account</h1>
              <button className="m-r ml-auto" onClick={() => onClickClose()}>
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

            <form>
              {/* Personal Information */}
              <div className="p-3 border-gray-200 border-solid rounded-lg flex flex-1 flex-col">
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
                      value={selectedRow.first_name}
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
                      value={selectedRow.middle_name}
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
                      value={selectedRow.last_name}
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
                      value={selectedRow.email}
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
                      type="password"
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
                    value={selectedRow.account_type}
                    onChange={(e) => {
                      setSelectedRow((prevSelectedRow) => ({
                        ...prevSelectedRow,
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

                <div className="flex items-center justify-center">
                  <button
                    className="btn w-64 flex flex-row bg-[#426E80] btn-wide shadow-md my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                    onClick={() => updateAccount(selectedRow.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <br />
        )}
      </div>
    </>
  );
}

export default Register;
