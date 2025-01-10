export const SharedMenuDisplay = ({ bg, menu }) => {
  
  return (
    <div className="h-[2000px] lg:h-[550px] relative">
      <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)] "></div>
      <img src={bg} className="h-full w-full object-center " />
      <div key={bg} className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 md:mt-16 mb-10">
        {
          menu?.map(dish => <div key={dish.id} className="relative max-sm:h-[450px] flex flex-col justify-center items-center">
            <div className="absolute -top-12 md:-top-36 left-1/2 transform -translate-x-1/2 w-[245px]">
              <img src={dish?.imgUrl} className="w-full rounded-full" alt={dish?.name} />
            </div>
            <div className="flex flex-col bg-gradient-to-l from-[#efefef] to-[#c8c5c6] rounded-[15%] pt-32 px-4">
              <h3 className="text-[#001735] text-2xl font-bold font-nunito">{dish?.name}</h3>
              <p className="text-[rgba(33,37,41,0.8)] font-heebo text-sm">{dish?.additionMeal}</p>
  
              <div className="mt-4 flex justify-between items-center pb-10">
                <h4 className="text-lg text-[#212529] font-semibold font-heebo">Price: ${dish?.price}</h4>
                <button className="btn btn-sm bg-[#001735] hover:bg-[rgb(25,64,116)] rounded-md uppercase font-heebo text-[#efefef] transform hover:scale-105">Add to Card</button>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};
