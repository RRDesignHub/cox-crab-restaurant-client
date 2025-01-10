import { SectionHeader } from "./SectionHeader";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import img_1 from "../assets/Category/breakfast.jpg";
import img_2 from "../assets/Category/lunch.jpg";
import img_3 from "../assets/Category/Dinner.jpg";
import img_4 from "../assets/Category/Beverages.jpg";
import img_5 from "../assets/Category/snaks.jpg";
import img_6 from "../assets/Category/Desert.jpg";
export const Category = () => {
  return (
    <>
      <div className="w-11/12 mx-auto py-10">
        <SectionHeader
          header={"Menu Category"}
          subHeader={"Choose your best categorised food menu for have..."}
        ></SectionHeader>
        <Swiper
          breakpoints={{
            480: {
              slidesPerView: 1, 
            },
            700: {
              slidesPerView: 2, 
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_1} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
                Breakfast
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_2} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
                Lunch
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_3} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
                Dinner
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_4} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
                Beverages
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_5} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
              Snacks
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-blue-50 drop-shadow-md p-4 rounded-xl flex flex-col justify-center items-center">
              <img src={img_6} className="w-[300px] rounded-xl " alt="" />
              <h3 className="text-2xl font-bold font-nunito mt-2 text-[rgba(0,18,26,0.7)]">
              Dessert
              </h3>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};
