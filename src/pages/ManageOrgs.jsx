import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageOrgs() {
  const navigate = useNavigate();
  let response;
  const userData = Cookies.get("userData");
  const accountID = JSON.parse(userData).id;
  const [companyData, setCompanyData] = useState({
    account_id: accountID,
    company_name: "",
    address: "",
    logo: ""
  });
  const [dataTable, setDataTable] = useState([]);
  const [rowSelected, setRowSelected] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
    getCompanies(accountID);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Ensure the file is an image
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the selected image and its base64 data
        setSelectedImage({ file, base64: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      // Reset selected image if the file is not an image
      setSelectedImage(null);
      alert('Please select a valid image file.');
    }
  };

  const clickEdit = (rowId) => {
    const selectedData = dataTable.find((row) => row.id === rowId)
    setSelectedRow(selectedData);
    setRowSelected(true);
  };
  const onClickClose = (rowId) => {
    setSelectedRow("");
    setRowSelected(false);
    setSelectedImage(null);
  };

  const getCompanies = async (accountID) => {
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

  const addCompany = async () => {
    const token = getToken();
    try {
      const response = await axios.post("http://localhost:3000/company", 
        companyData, 
        {
          headers: {
            Authorization: token,
          },
        });
        if (response) {
          console.log("TRUE");
          getCompanies(accountID);
          setCompanyData({
            ...companyData,
            company_name: "",
            address: "",
            logo: ""
          });
        }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateCompany = async (recordID) => {
    console.log(selectedRow);
    try {
      const token = getToken();
      const response = await axios.patch(`http://localhost:3000/company/edit/${recordID}`, selectedRow, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        console.log("Record updated successfully!");
        setRowSelected(false);
        getCompanies(accountID);
      } else {
        console.error("Failed to update record");
      }
    } catch (error) {
      console.error("Error updating account: ", error);
    }
  };

  const deleteCompany = async (recordID) => {
    try{
      const token = getToken();
      response = await axios.delete(`http://localhost:3000/company/remove/${recordID}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        getCompanies(accountID);
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
      <div className="p-4 m-5">
        <div className="m-2">
          <h1 className="text-3xl font-bold tracking-wide">Manage Organization</h1>
        </div>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col">
          <h1 className=" text-xl font-bold mx-3">Add Organization</h1>

          <label className="form-control w-full max-w-xs my-3 mx-3">
            <div className="label">
              <span className="label-text font-semibold text-xl">
                Organization Name
              </span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs" 
              value={companyData.company_name}
              required
              onChange={(e) => {
                setCompanyData((prevCompanyData) => ({
                  ...prevCompanyData,
                  company_name: e.target.value,
                }));
              }}/>
          </label>
          <label className="form-control my-3 mx-3">
            <div className="label">
              <span className="label-text font-semibold text-xl">
                Address
              </span>
            </div>
            <input type="text" className="input input-bordered w-full max-w-xs"
              value={companyData.address}
              required
              onChange={(e) => {
                setCompanyData((prevCompanyData) => ({
                  ...prevCompanyData,
                  address: e.target.value,
                }));
              }}/>
          </label>
          <div>
            <label
              htmlFor="uploadFile1"
              className="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
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
              <input type="file" onChange={handleImageChange} id="uploadFile1" className="hidden" />
            </label>

            {selectedImage && (
              <div className="px-2 m-2 my-2 ">
                <h4>Selected Logo:</h4>
                <img
                  src={selectedImage.base64}
                  alt="Selected"
                  style={{ maxWidth: '100%', maxHeight: '150px' }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button className="btn w-64 flex flex-row bg-[#426E80] btn-wide shadow-md my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
            onClick={() => addCompany()}>
              Submit
            </button>
          </div>
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
                      <td>{row.company_name}</td>
                      <td>{row.address}</td>
                      <td>
                        <button
                          onClick={() => clickEdit(row.id)}
                          className="btn btn-sm btn-edit bg-[#426E80] shadow-md px-4 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteCompany(row.id)}
                          className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
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
          {rowSelected && (
            <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col">
              <h1 className=" text-xl font-bold mx-3">Update Organization</h1>
              <button className="ml-auto" onClick={() => onClickClose()}>
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

              <label className="form-control w-full max-w-xs my-3 mx-3">
                <div className="label">
                  <span className="label-text font-semibold text-xl">
                    Organization Name
                  </span>
                </div>
                <input type="text" 
                  className="input input-bordered w-full max-w-xs" 
                  value={selectedRow.company_name}
                  required
                  onChange={(e) => {
                    setSelectedRow((prevSelectedRow) => ({
                      ...prevSelectedRow,
                      company_name: e.target.value,
                    }));
                  }}/>
              </label>
              <label className="form-control my-3 mx-3">
                <div className="label">
                  <span className="label-text font-semibold text-xl">
                    Address
                  </span>
                </div>
                <input type="text" 
                  className="input input-bordered w-full max-w-xs"
                  value={selectedRow.address}
                  onChange={(e) => {
                    setSelectedRow((prevSelectedRow) => ({
                      ...prevSelectedRow,
                      address: e.target.value,
                    }));
                  }}/>
              </label>
              <div>
                <label
                  htmlFor="uploadFile1"
                  className="btn bg-[#426E80] btn-wide shadow-md px-4 m-2 my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
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
                  <input type="file" onChange={handleImageChange} id="uploadFile1" className="hidden" />
                </label>

                {selectedImage && (
                  <div className="px-2 m-2 my-2 ">
                    <h4>Selected Logo:</h4>
                    <img
                      src={selectedImage.base64}
                      alt="Selected"
                      style={{ maxWidth: '100%', maxHeight: '150px' }}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button className="btn w-64 flex flex-row bg-[#426E80] btn-wide shadow-md my-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
                onClick={() => updateCompany(selectedRow.id)}>
                  Submit
                </button>
              </div>
            </div>
          )}

      </div>
    </>
  );
}

export default ManageOrgs;
