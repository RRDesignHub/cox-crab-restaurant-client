import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SharedHero } from "../Components/SharedHero";
import { SectionHeader } from "../Components/SectionHeader";
import { SharedMenuDisplay } from "../Components/SharedMenuDisplay";
import heroImg from "../assets/Banner/slide-6.jpg"
import breakfastBg from "../assets/Bf_bg1a.jpg"
import dinnerBg from "../assets/Din_bg.jpg"
import lunchBg from "../assets/Lunch_bg.jpg"
const Menu = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  useEffect(() => {
    handleClientsData();
  }, []);

  const handleClientsData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      const filterBreakfast = data.filter(dish => dish.category == "breakfast");
      setBreakfast(filterBreakfast);
      const filterLunch = data.filter(dish => dish.category == "lunch");
      setLunch(filterLunch);
      const filterDinner = data.filter(dish => dish.category == "dinner");
      setDinner(filterDinner);
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  return (
    <>
      <div>
        <SharedHero image={heroImg} title={"Our Menu"} descriptions={"Have your meal..."}></SharedHero>
      </div>
      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Breakfast"} subHeader={"Start your day with fresh seafood..."}></SectionHeader></div>
        <SharedMenuDisplay bg={breakfastBg} menu={breakfast}></SharedMenuDisplay>
      </div>

      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Lunch"} subHeader={"Have your lunch with fresh seafood..."}></SectionHeader></div>
        <SharedMenuDisplay bg={lunchBg} menu={lunch}></SharedMenuDisplay>
      </div>


      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Dinner"} subHeader={"Have your dinner with fresh seafood..."}></SectionHeader></div>
        <SharedMenuDisplay bg={dinnerBg} menu={dinner}></SharedMenuDisplay>
      </div>
    </>
  )
}
export default Menu;