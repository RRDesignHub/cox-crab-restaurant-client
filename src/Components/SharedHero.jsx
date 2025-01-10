
export const SharedHero = ({image, title, descriptions}) => {
  return (
    <div className="h-[500px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)] "></div>
        <img src={image} className="h-full w-full object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col justify-center gap-5 items-center my-10">
          <div className="">
            <h1 className=" text-4xl md:text-6xl lg:text-6xl font-extrabold font-nunito text-blue-50 uppercase">
              {title}
            </h1>
            <p className="font-heebo py-4">
             {descriptions}
            </p>
          </div>
          
        </div>
      </div>
  )
}
