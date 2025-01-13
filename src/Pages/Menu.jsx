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
import beveragesBg from "../assets/Bavrage_bg.jpg"
const Menu = () => {
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    handleClientsData();
  }, []);

  const handleClientsData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/menu`);
      const filterBreakfast = data.filter(dish => dish.category == "breakfast");
      const filterLunch = data.filter(dish => dish.category == "lunch");
      const filterDinner = data.filter(dish => dish.category == "dinner");
      const filterSnacks = data.filter(dish => dish.category == "snacks");
      const filterBeverages = data.filter(dish => dish.category == "beverages");
      setBreakfast(filterBreakfast);
      setLunch(filterLunch);
      setDinner(filterDinner);
      setSnacks(filterSnacks);
      setBeverages(filterBeverages);
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
        <div className="w-11/12 mx-auto"><SectionHeader header={"Breakfast"} subHeader={"Start Your Day with Oceanic Delights..."}></SectionHeader></div>
        <SharedMenuDisplay bg={breakfastBg} menu={breakfast}></SharedMenuDisplay>
      </div>

      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Lunch"} subHeader={"Midday Seafood Retreats to Savor..."}></SectionHeader></div>
        <SharedMenuDisplay bg={lunchBg} menu={lunch}></SharedMenuDisplay>
      </div>


      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Dinner"} subHeader={"Evening Indulgence in Coastal Flavors..."}></SectionHeader></div>
        <SharedMenuDisplay bg={dinnerBg} menu={dinner}></SharedMenuDisplay>
      </div>
      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Snacks"} subHeader={"Light Bites and Sweet Treats from the Sea..."}></SectionHeader></div>
        <SharedMenuDisplay bg={lunchBg} menu={snacks}></SharedMenuDisplay>
      </div>
      <div className="mt-10">
        <div className="w-11/12 mx-auto"><SectionHeader header={"Beverages"} subHeader={"Refreshments Inspired by the Ocean Breeze..."}></SectionHeader></div>
        <SharedMenuDisplay bg={beveragesBg} menu={beverages}></SharedMenuDisplay>
      </div>
    </>
  )
}
export default Menu;