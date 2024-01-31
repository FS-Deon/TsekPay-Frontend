import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function PayItems() {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64 flex flex-col">
        <Header />
        <div className="flex flex-row">
          <h1 className="m-5 px-5 text-3xl font-bold">Pay Items</h1>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn my-4"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Pay Items
          </button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Click the button below to close</p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <table class="m-4 p-3 border-2 border-gray-200 border-solid rounded-lg container ">
          <thead>
            <tr>
              <th class="border-2 border-gray-200 border-solid font-bold text-lg py-2">
                Earnings
              </th>
              <th class="border-2 border-gray-200 border-solid font-bold text-lg py-2">
                Category
              </th>
              <th class="border-2 border-gray-200 border-solid  font-bold text-lg py-2">
                Rate
              </th>
              <th class="border-2 border-gray-200 border-solid  font-bold text-lg py-2">
                Paid To
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-2 border-gray-200 border-solid text-lg py-2">
                Basic Pay
              </td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
            </tr>
            <tr>
              <td class="border-2 border-gray-200 border-solid text-lg py-2">
                Basic Pay
              </td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
              <td class="border-2 border-gray-200 border-solid text-lg py-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PayItems;
