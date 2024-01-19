function Header() {
  return (
    <>
      <div className="bg-[#4A6E7E] flex flex-row justify-between">
        <div className="flex flex-row mx-3">
          <img src="../Frame.png" alt="logo" />

          <div className="mx-3 mt-3 flex flex-col hidden lg:block">
            {/*greetings*/}
            <div className="text-lg text-white font-bold">
              <p>Good morning User</p>
            </div>
            <div className="text-lg text-[#AAE2EC]">January 8, 2024</div>
          </div>
        </div>
        <div className="mx-5 my-1 flex flex-col">
          <h3 className="text-[13px] font-regular text-white">Client</h3>
          <select className="select select-bordered w-full max-w-xs px-20">
            <option disabled selected>
              Fullsuite
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Header;
