import { useEffect, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { useCard } from "../Hooks/useCard";
export const PopularDish = () => {
  const [, refetch] = useCard();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    handlePopularDishes();
  }, []);

  // load dishes from db:
  const handlePopularDishes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/popularMenu?category=popular`
      );

      setDishes(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddToCard = async (id, dishName, dishImg, price) => {
    const cardData = {
      menuId: id,
      dishName,
      dishImg,
      price,
      userEmail: user?.email,
      userName: user?.displayName
    };
    if (user && user?.email) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/addToCard`,
        cardData
      );
      if(data.insertedId){
        toast.success(`Dish successfully added to your card!!!` );
        refetch();
      }
    } else {
      toast.error("Please login first!!!");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="w-11/12 mx-auto">
        <SectionHeader
          header={"Popular Dish"}
          subHeader={"Choose dish from popular dishes..."}
        ></SectionHeader>
      </div>
      <div className="bg-blue-100">
        <div className="w-11/12 mx-auto py-5 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {dishes.map((dish) => (
            <div
              key={dish?._id}
              className="bg-white p-3 md:p-6 rounded-xl flex max-sm:flex-wrap gap-2 md:gap-3 justify-between "
            >
              <img
                className="h-14 w-14 md:w-20 md:h-20 rounded-r-full rounded-b-full "
                src={dish?.imgUrl}
                alt={dish?.name}
              />
              <div className="">
                <h3 className="text-xl md:text-2xl font-nunito font-bold text-[#001735]">
                  {dish?.name}
                </h3>
                <p className="font-heebo text-[rgba(0,23,53,0.61)]">
                  {dish?.additionMeal}
                </p>
              </div>
              <button
                onClick={() => handleAddToCard(dish._id, dish?.name, dish?.imgUrl, dish?.price)}
                className="btn btn-sm md:btn-md max-sm:ms-auto bg-[rgb(25,64,116)] hover:bg-[#001735] rounded-lg uppercase font-heebo text-[#efefef] transform hover:scale-105"
              >
                Add to Card
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
