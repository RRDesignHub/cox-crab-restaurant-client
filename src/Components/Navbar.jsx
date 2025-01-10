import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { HiShoppingCart } from "react-icons/hi";
import { FaWindowClose } from "react-icons/fa";
import logo from "./../assets/logo_pro2.png";
import { useCard } from "../Hooks/useCard";
import { useAuth } from "../Hooks/useAuth";
export const Navbar = () => {
  const [card] = useCard();
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpne] = useState(false);
  const [openCloseMenu, setOpenCloseMenu] = useState(true);


  const handleOpenCloseMenu = (status) => {
    setOpenCloseMenu(!status);
  };
  const handleProfileToagle = () => {
    setIsOpne(!isOpen);
  };

  const handleUserLogout = () => {
    
    logoutUser();
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent text-blue-50 font-semibold underline focus:bg-transparent"
              : "text-blue-50 hover:text-[#d5e4fd] hover:underline focus:text-[#4A5568]"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent text-blue-50 font-semibold underline focus:bg-transparent"
              : "text-blue-50 hover:text-[#d5e4fd] hover:underline focus:text-[#4A5568]"
          }
          to="/menu"
        >
          Menu
        </NavLink>
      </li>
      {user ? (
        <>
          <div className="relative">
            <img
              onClick={handleProfileToagle}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full border-2 border-[#D9EAFD]"
              src={user?.photoURL}
              alt=""
            />
            <div
              className={`absolute z-30 top-14 w-fit lg:w-[300px] rounded-lg flex-col items-center justify-center gap-2 bg-[#F8FAFC] lg:bg-[#D9EAFD] p-5 shadow-xl ${
                isOpen ? "flex max-sm:-left-10 lg:-right-2" : "hidden"
              }`}
            >
              <h3 className="text-lg font-medium text-center text-[#4A5568]">
                {user?.displayName || "Guest"}
              </h3>
              <button
                onClick={handleUserLogout}
                className="btn py-0 text-sm bg-[#D9EAFD] lg:bg-[#F8FAFC] text-[#4A5568] w-fit h-fit hover:border-[#BCCCDC] hover:bg-[#BCCCDC] hover:text-[#1A202C]"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-transparent text-blue-50 font-semibold underline focus:bg-transparent"
                  : "text-blue-50 hover:text-[#d5e4fd] hover:underline focus:text-[#4A5568]"
              }
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-transparent text-blue-50 font-semibold underline focus:bg-transparent"
                  : "text-blue-50 hover:text-[#d5e4fd] hover:underline focus:text-[#4A5568]"
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
      <li>
      <Link to="/dashboard">
        <button className="btn bg-[#eaf4ff] text-[#001735]">
          <HiShoppingCart className="text-xl " />
          <div className="badge bg-[#001735] text-[#eaf4ff]">
            {card?.length}
          </div>
        </button>
      </Link>
        
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-transparent text-blue-50 font-semibold underline focus:bg-transparent"
              : "text-blue-50 hover:text-[#4A5568] hover:underline focus:text-[#4A5568]"
          }
          to="/borrowedBooks"
        >
          <button className="btn bg-[#eaf4ff] text[#001735]">
            Book A Table
          </button>
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar py-0 w-11/12 mx-auto relative ">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-1 md:gap-2">
            <img
              className="h-[50px] rounded-md md:rounded-lg drop-shadow-lg"
              src={logo}
              alt="Book Hub logo"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1 space-x-4 font-heebo">
            {links}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <div className="py-2 px-3 rounded-lg bg-[#D9EAFD] text-blue-950">
            {openCloseMenu ? (
              <TiThMenu
                onClick={() => handleOpenCloseMenu(true)}
                className="text-2xl"
              />
            ) : (
              <FaWindowClose
                onClick={() => handleOpenCloseMenu(false)}
                className="text-2xl"
              />
            )}
          </div>
          <ul
            className={`absolute z-50 w-full bg-[rgba(0,23,53,0.8)] text-2xl font-semibold flex flex-col gap-3 justify-center duration-500 rounded-lg bg-[#BCCCDC] shadow-lg px-14 py-10 top-20 font-heebo ${
              openCloseMenu ? "-right-[1000px]" : "right-0"
            }`}
          >
            {links}
          </ul>
        </div>
      </div>
    </>
  );
};
