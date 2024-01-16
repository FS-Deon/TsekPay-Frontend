function SelectOrg() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-lg text-center my-5">Select Organization</h1>
        <div className="flex flex-row">
          <div className="card w-96 bg-base-100 shadow-xl mx-3">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mx-3">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl mx-3  +">
            <figure>
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectOrg;
