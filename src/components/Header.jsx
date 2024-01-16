function Header() {
  return (
    <>
      {/*greetings*/}
      <div className="mx-2 mb-1 text-xl">January 8, 2024</div>
      <div className="m-2 text-3xl font-bold">
        <p>Good morning User</p>
      </div>
      {/*notices*/}
      <div className="flex lg:flex-row flex-col">
        <div className="flex flex-col lg:w-[30%]">
          <div className="m-2 p-3 border-2 border-gray-200 border-solid rounded-lg flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold mb-4">Date of last upload</h1>
            <h1 className="text-[40px] font-black text-center">
              December <br />
              <span className="text-6xl">05,</span> <br /> 2023
            </h1>
            <p className="font-regular text-xl">16 Days Ago</p>
          </div>

          <button className="mx-2 px-3 btn btn-outline border-2 border-gray-200">
            Upload File
          </button>
        </div>

        <div className="m-2 p-3 border-2 lg:w-[70%] border-gray-200 border-solid rounded-lg  flex flex-col">
          <h1>Important Dates</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
