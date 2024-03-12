import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import AddForm from "../components/pay-items/AddForm.jsx";
import EditForm from "../components/pay-items/EditForm.jsx";
import DropdownCompany from "../components/DropdownCompany.jsx";
import Swal from "sweetalert2";

function PayItems() {
  let response;
  const userData = Cookies.get("userData");
  const accountID = JSON.parse(userData).id;
  const [companyID, setCompanyID] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [rowSelected, setRowSelected] = useState(false);
  const [isEditFormOpen, setEditFormOpen] = useState(false);

  useEffect(() => {
    if (!userData) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }
  }, []);

  // Get token from userData cookie
  const getToken = () => {
    const userData = JSON.parse(Cookies.get("userData"));
    return userData.token;
  };

  const companyChange = (selectedCompany) => {
    setCompanyID(selectedCompany);
    getPayItems(selectedCompany);
  };

  const getPayItems = async (value_ID) => {
    try {
      if (value_ID != null && value_ID != undefined && value_ID != "") {
        const token = getToken();
        const response = await axios.get(
          `http://localhost:3000/pay-item/view/${value_ID}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const rows = response.data.rows;
        // Check if response is not null before updating state
        if (rows) {
          setDataTable(rows);
        }
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const editPayItem = (payItemInfo) => {
    setSelectedRow(payItemInfo);
    setRowSelected(true);
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
        //delete pay item
        deletePayItem(rowID);
      }
    });
  };

  const deletePayItem = async (recordID) => {
    let status = "";
    let message = "";

    try {
      const token = getToken();
      response = await axios.delete(
        `http://localhost:3000/pay-item/remove/${recordID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        getPayItems(companyID);
        console.log("Record deleted successfully!");
        status = "success";
        message = "Record deleted successfully!";
      } else {
        console.error("Failed to delete record");
        status = "error";
        message = "Failed to delete record";
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
      status = "error";
      message = "Failed to delete record";
    } finally {
      showAlert(status, message);
    }
  };

  const showAlert = (status, title) => {
    Swal.fire({
      icon: status,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex w-full">
            <div className="flex-col w-full">
              <h1 className="text-3xl font-bold">Pay Items</h1>
            </div>
            <div className="flex flex-col w-full items-end md:items-start">
              <AddForm comp_id={companyID} action={()=>{getPayItems(companyID)}}></AddForm>
            </div>
          </div>
          <div className="flex-col">
            <DropdownCompany companyID={companyChange}></DropdownCompany>
          </div>
        </div>

        <div className="mt-5 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
          {companyID && dataTable ? (
            <table border="1" className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className="w-40">Actions</th>
                  {/* Add more columns based on your data structure */}
                </tr>
              </thead>
              <tbody>
                {dataTable.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>
                      <div className="flex justify-between gap-1">
                        <EditForm
                          payItemID={row.id}
                          payItemData={row}
                          action={()=>{getPayItems(companyID)}}
                        ></EditForm>
                        <button
                          onClick={() => toggleDelete(row.id)}
                          className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 m-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80] w-20"
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
            <h1 className="m-auto">No Company selected</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default PayItems;
