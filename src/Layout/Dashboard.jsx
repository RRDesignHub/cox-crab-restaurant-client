import { NavLink, Outlet } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { ImSpoonKnife } from "react-icons/im";
import { PiUsersFourFill } from "react-icons/pi";
import { FaBook, FaCalendarAlt, FaThList } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { useRole } from "../Hooks/useRole";
export const Dashboard = () => {
  const [isAdmin] = useRole();
  
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5">
        {/* dashboard side bar */}
        <div className="md:w-64 md:h-screen py-5 bg-blue-200 shadow-lg">
          <div className="ps-4">
            <h1 className=" font-nunito text-4xl font-bold text-[#001735] uppercase">Cox Crab</h1>
            <h2 className="font-heebo text-xl font-semibold text-[rgba(0,23,53,0.8)]">Restaurant</h2>
          </div>
          <div className="divider my-0"></div>
          <ul className="font-heebo flex flex-row max-sm:flex-wrap md:flex-col text-md text-center space-y-2 *:px-3">
            {isAdmin ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/adminHome"
                  >
                    <IoHome></IoHome> Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/addMenu"
                  >
                    <ImSpoonKnife /> Add Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/manageMenu"
                  >
                    <FaThList /> Manage Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/bookings"
                  >
                    <FaBook></FaBook> Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/users"
                  >
                    <PiUsersFourFill /> All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/userHome"
                  >
                    <IoHome></IoHome> User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/reservation"
                  >
                    <FaCalendarAlt></FaCalendarAlt> Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/myCart"
                  >
                    <FaShoppingCart></FaShoppingCart> My Cart
                  </NavLink>
                </li>
                
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-3 px-5 rounded-lg ${
                        isActive
                          ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                          : "bg-transparent hover:underline text-[#001735] "
                      }`
                    }
                    to="/dashboard/addReview"
                  >
                    <FaStar></FaStar> Add Review
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider bg-[rgba(0,23,53,0.61)] h-[2px]"></div>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-5 rounded-lg ${
                    isActive
                      ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                      : "bg-transparent hover:underline text-[#001735] "
                  }`
                }
                to="/"
              >
                <IoHome></IoHome> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3 px-5 rounded-lg ${
                    isActive
                      ? "bg-[#001735]  text-blue-50 font-semibold focus:bg-[#001735]"
                      : "bg-transparent hover:underline text-[#001735] "
                  }`
                }
                to="/menu"
              >
                <TiThMenu></TiThMenu> Menu
              </NavLink>
            </li>
          </ul>
        </div>

        {/* dashboard dynamic section */}
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
