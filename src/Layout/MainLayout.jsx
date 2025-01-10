import { Outlet } from "react-router-dom"
import { Navbar } from "../Components/Navbar"
import { Footer } from "../Components/Footer"
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if the user scrolls down by 50px or more
      setIsScrolled(window.scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header className={`navbar py-0 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#001735] shadow-xl" : "bg-transparent"
      }`}>
        <Navbar></Navbar>
      </header>

      <main className="min-h-[calc(100vh-220px)]">
        <Outlet></Outlet>
      </main>
      <footer className="bg-base-300 text-base-content">
        <Footer></Footer>
      </footer>
    </>
  )
}
