import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import axios from "axios";
import toast from "react-hot-toast";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonial from "../assets/testimonial.jpg";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
export const Testimonial = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    handleClientsData();
  }, []);

  const handleClientsData = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/review`
      );
      setClients(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="my-10">
        <div className="w-11/12 mx-auto">
          <SectionHeader
            header="Testimonial"
            subHeader={"Clients say about us..."}
          ></SectionHeader>
        </div>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {clients.map((client) => (
            <SwiperSlide key={client.id}>
              <div className="relative h-[600px] md:h-[400px]">
                {/* Overlay */}
                <div className="absolute bg-[rgba(0,18,26,0.6)] h-full w-full object-center"></div>

                {/* Background Image */}
                <img
                  src={testimonial}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Content */}
                <div className="absolute w-full px-5 md:w-11/12 mx-auto top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-blue-50 flex flex-col md:flex-row justify-center gap-5 items-center">
                  {/* Client Image */}
                  <div>
                    <img
                      src={client?.imgUrl}
                      className="border-4 border-[#b6d6fd] h-[100px] w-[100px] md:w-[170px] md:h-[170px] rounded-full"
                      alt="client_1"
                    />
                  </div>

                  {/* Client Info */}
                  <div className="md:border-l-[5px]  border-[#b6d6fd] md:ps-4 py-2 text-center md:text-left">
                    <h3 className="font-nunito text-2xl md:text-4xl text-[#b6d6fd] font-bold">
                      {client?.name}
                    </h3>
                    <h4 className="text-[rgba(234,244,255,0.52)] text-lg md:text-xl font-nunito font-bold">
                      {client?.proff}
                    </h4>

                    <ReactStars
                      value={client?.rating}
                      size={20}
                      activeColor="#ffd700"
                    />

                    <p className="text-[#eaf4ff] italic font-heebo mt-3 w-full max-w-[90%] md:max-w-[500px] mx-auto">
                      <FaQuoteLeft /> {client?.feedback} <FaQuoteRight />
                    </p>
                  </div>
                </div>

                {/* Button */}
                <Link to='/dashboard/addReview'>
                  <button className="mb-4 absolute bottom-5 left-1/2 transform -translate-x-1/2 btn bg-[#b6d6fd] uppercase text-[#001735] text-sm md:text-md">
                    Share Your Experience
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
