import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageOrgs() {
  const navigate = useNavigate();
  let response;
  const userData = Cookies.get("userData");
  const userID = JSON.parse(userData).id;
  const [organizations, setOrganizations] = useState({
    logo: "",
    name: "",
    address: "",
    payables: {}
  });
  const [dataTable, setDataTable] = useState([]);
  const [rowSelected, setRowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    getOrganizations(userID);
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const getOrganizations = async (accountID) => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:3000/company/view/${accountID}`, {
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
      console.error("Error: ", error);
    }
  };

  const addOrganization = async () => {
    try {
      const response = await axios.post("http://localhost:3000/company", {
        account_id,
        commpany_name,
        address,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="m-5 px-5 text-3xl font-bold">Manage Organization</h1>
      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col">
        <h1 className=" text-xl font-bold mx-3">Add Organization</h1>

        <label
          htmlFor="uploadFile1"
          className="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 my-2 text-white hover:bg-[#AAE2EC] hover:text-[#426E80]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 mr-2 fill-white inline"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          Upload Image
          <input type="file" id="uploadFile1" className="hidden" />
        </label>

        <label className="form-control w-full max-w-xs my-3 mx-3">
          <div className="label">
            <span className="label-text font-semibold text-xl">
              Organization Name
            </span>
          </div>
          <input type="text" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control my-3 mx-3">
          <div className="label">
            <span className="label-text font-semibold text-xl">
              Address
            </span>
          </div>
          <textarea className="textarea textarea-bordered h-24 w-[30%]"></textarea>
          <div className="flex items-center justify-center">
            <button className="btn btn-sm mx-3 my-2 w-[10%] place-items-center">
              Submit
            </button>
          </div>
        </label>
      </div>

      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {dataTable ? (
            <table border="1">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th></th>
                  <th></th>
                  {/* Add more columns based on your data structure */}
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.logo}</td>
                    <td>{row.name}</td>
                    <td>{row.address}</td>
                    <td>
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

export default ManageOrgs;
