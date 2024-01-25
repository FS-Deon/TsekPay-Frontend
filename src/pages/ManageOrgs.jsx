import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ManageOrgs() {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <h1 className="m-5 px-5 text-3xl font-bold">Manage Organization</h1>
        <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-row mx-10">
          <h1 className=" text-xl font-bold">Add Organization</h1>
        </div>
      </div>
    </>
  );
}

export default ManageOrgs;
