import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function DropdownCompany({companyID}){
    const userData = Cookies.get("userData");
    const accountID = JSON.parse(userData).id;
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        getCompanies(accountID);
        const initialSelectedValue = dataTable.length > 0 ? dataTable[0].id : null;
        dropdownChange(initialSelectedValue);
      }, []);
      

    // Get token from userData cookie
    const getToken = () => {
        const userData = JSON.parse(Cookies.get("userData"));
        return userData.token;
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

    const dropdownChange = (selectedCompany) => {
        console.log("Dropdown component: ", selectedCompany);
        companyID(selectedCompany);
    }

    return(
        <>
            {dataTable &&
                <select
                    className="select select-bordered w-full max-w-xs px-20"
                    onChange={(e) => dropdownChange(e.target.value)}
                >
                    <option value="">None</option>
                    {dataTable.map((rows) => (
                    <option key={rows.id} id={rows.id} value={rows.id}>
                        {rows.company_name}
                    </option>
                    ))}
                </select>
            
            }
        </>
    )
}

export default DropdownCompany;