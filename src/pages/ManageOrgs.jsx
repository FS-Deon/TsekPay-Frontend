import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ManageOrgs() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const userAuthToken = Cookies.get("userData");
    if (!userAuthToken) {
      // Redirect to the login page if there is no cookie
      navigate("/login");
    }

    getOrganizations();
    console.log("done");
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const getOrganizations = async () => {
    console.log("Get Companies.");
    try {
      const response = await axios.get("http://localhost:3000/company/view", {
        headers: {
          Authorization: axios.defaults.headers.common["Authorization"],
        },
      });
      setOrganizations(response.data); // Assuming the response contains an array of organizations
      console.log(response);
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
      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-9">
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
              Description
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

      <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col mx-9">
        <h1 className=" text-xl font-bold mx-3">Organizations</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  {" "}
                  <img
                    src="../Fs-logo.png"
                    className="h-[100px] w-[100px]"
                    alt="logo"
                  />
                </th>
                <td>Fullsuite</td>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris molestie est magna, vitae fringilla massa semper id.
                </td>
                <td className="">
                  {" "}
                  <a className="link mx-3">Edit</a>{" "}
                  <a className="link mx-3">Delete</a>
                </td>
              </tr>
              {/* row 1 */}
              <tr>
                <th>
                  {" "}
                  <img
                    src="../Fs-logo.png"
                    className="h-[100px] w-[100px]"
                    alt="logo"
                  />
                </th>
                <td>Fullsuite</td>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris molestie est magna, vitae fringilla massa semper id.
                </td>
                <td className="">
                  {" "}
                  <a className="link mx-3">Edit</a>{" "}
                  <a className="link mx-3">Delete</a>
                </td>
              </tr>
              {/* row 1 */}
              <tr>
                <th>
                  {" "}
                  <img
                    src="../Fs-logo.png"
                    className="h-[100px] w-[100px]"
                    alt="logo"
                  />
                </th>
                <td>Fullsuite</td>
                <td>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris molestie est magna, vitae fringilla massa semper id.
                </td>
                <td className="">
                  {" "}
                  <a className="link mx-3">Edit</a>{" "}
                  <a className="link mx-3">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageOrgs;
