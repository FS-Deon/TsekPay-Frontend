function Header() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  const dateToday = today.toLocaleString("en-US", options);
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
            <div className="text-lg text-[#AAE2EC] font-bold">{dateToday}</div>
          </div>
        </div>
        <div className="mx-5 my-1 flex flex-col">
          <h3 className="text-[13px] font-regular text-white">Client</h3>
          <select className="select select-bordered w-full max-w-xs px-20">
            <option disabled>Fullsuite</option>
            <option>Fullsuite</option>
            <option>Ananda Spa</option>
            <option>Get Dentals</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Header;
