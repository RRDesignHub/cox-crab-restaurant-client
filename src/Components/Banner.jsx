import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slide_1 from "../assets/Banner/slide-1.jpg";
import slide_2 from "../assets/Banner/slide-2.jpg";
import slide_3 from "../assets/Banner/slide-3.jpg";
import slide_4 from "../assets/Banner/slide-4.png";
import slide_5 from "../assets/Banner/slide-5.jpg";
import slide_6 from "../assets/Banner/slide-6.jpg";
import { Link } from "react-router-dom";
export const Banner = () => {
  return (
    <Carousel>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.7)] "></div>
        <img src={slide_1} className="h-full w-full max-sm:object-cover object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col lg:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className=" font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.61)] "></div>
        <img src={slide_2} className="h-full w-full max-sm:object-cover object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className="font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.65)]"></div>
        <img src={slide_3} className="h-full w-full max-sm:object-cover object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className="font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.65)]"></div>
        <img src={slide_4} className="h-full w-full max-sm:object-cover object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className="font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full bg-[rgba(0,18,26,0.5)]"></div>
        <img src={slide_5} className="h-full w-full max-sm:object-cover object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className="font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="h-[500px] md:h-[700px] lg:h-[550px] relative">
        <div className="absolute h-full w-full max-sm:object-cover bg-[rgba(0,18,26,0.7)]"></div>
        <img src={slide_6} className="h-full w-full object-center " />
        <div className="absolute w-11/12 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center my-10">
          <div className=" flex-1">
            <h1 className="text-left text-3xl md:text-5xl lg:text-6xl font-extrabold font-nunito text-blue-50">
              From The Sea To Your Plate: A Soulful Seafood Experience.
            </h1>
            <p className="font-heebo text-left py-4">
              Nestled at Laboni Point in the heart of Cox's Bazar, Cox Crab
              stands as an epitome of seafood mastery. Our restaurant, acclaimed
              by many, is where the freshest catch of the sea meets unparalleled
              culinary craftsmanship, offering guests a gastronomic journey that
              tantalizes the senses and celebrates oceanic flavors.
            </p>
            <div className="text-left space-x-4">
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Our Menu
              </Link>
              <Link className="btn bg-blue-50 text-[#00121acc] uppercase">
                Book A Table
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </Carousel>
  );
};
