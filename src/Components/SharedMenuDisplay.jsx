export const SharedMenuDisplay = ({ bg, menu }) => {
  return (
    <div className="">
      {/* Content Layer */}
      <div className="relative pt-12 pb-20 px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
      {/* Background Layer */}
      <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)]"></div>
      <img
        src={bg}
        className="absolute h-full w-full object-cover"
        alt="Background"
      />
        {menu?.map((dish) => (
          <div
            key={dish.id}
            className=" relative flex flex-col justify-center items-center mt-[130px]"
          >
            {/* Dish Image */}
            <div className="absolute transform left-1/2 -translate-x-1/2 -top-32 w-[240px] h-[240px] rounded-full z-10">
              <img
                src={dish?.imgUrl}
                className="w-full h-full object-cover rounded-full"
                alt={dish?.name}
              />
            </div>

            {/* Card Content */}
            <div className="bg-gradient-to-l from-[#efefef] to-[#c8c5c6] w-[280px] rounded-3xl pt-28 px-4 shadow-md">
              <h3 className="text-[#001735] text-xl md:text-2xl font-bold font-nunito text-center pt-3">
                {dish?.name}
              </h3>
              <p className="text-[rgba(33,37,41,0.8)] font-heebo text-sm pb-2 text-center">
                {dish?.additionalMeal}
              </p>

              <div className="mt-4 flex justify-between items-center pb-6">
                <h4 className="text-lg text-[#212529] font-semibold font-heebo">
                  Price: ${dish?.price}
                </h4>
                <button className="btn btn-sm bg-[#001735] hover:bg-[rgb(25,64,116)] rounded-md uppercase font-heebo text-[#efefef] transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
