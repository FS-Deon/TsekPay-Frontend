import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import AddForm from "../components/pay-items/AddForm.jsx";
import EditForm from "../components/pay-items/EditForm.jsx";
import DropdownCompany from "../components/DropdownCompany.jsx";

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
  }

  const getPayItems = async (value_ID) => {
    try {
      if(value_ID != null && value_ID != undefined){
        const token = getToken();
        const response = await axios.get(`http://localhost:3000/pay-item/view/${value_ID}`, {
          headers: {
            Authorization: token,
          },
        });
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

  const deletePayItem = async(recordID) => {
    try{
      const token = getToken();
      response = await axios.delete(`http://localhost:3000/pay-item/remove/${recordID}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        getPayItems(companyID);
        console.log("Record deleted successfully!");
      } else {
        console.error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error viewing accounts: ", error);
    }

  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="m-5 px-5 text-3xl font-bold">Pay Items</h1>

        <AddForm comp_id = {companyID}></AddForm>
        <div className="m-5 px-5 flex flex-col">
          <DropdownCompany companyID = {companyChange}></DropdownCompany>
        </div>
      </div>

      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-1 flex-col overflow-x-auto">
        {companyID && dataTable ? (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th></th>
                <th></th>
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
                    <EditForm payItemID = {row.id} payItemData = {row}></EditForm>
                  </td>
                  <td>
                    <button
                      onClick={() => deletePayItem(row.id)}
                      className="btn btn-sm btn-danger bg-[#Cc0202] shadow-md px-4 m-2 text-white hover:bg-[#f7f7f7] hover:text-[#426E80]"
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
            <h1 className="m-auto">No Company selected</h1>
        )
    
        }

      </div>
    </>
  );
}

export default PayItems;
