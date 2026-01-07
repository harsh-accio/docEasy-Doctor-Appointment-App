import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);


  const logout = async () => {
    token && setToken("");
    token && localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        src={assets.applogo}
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <ul className="hidden md:flex item-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-green-950">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 hover:text-green-950">DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1 hover:text-green-950">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1 hover:text-green-950">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-12 h-12 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-sm font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  MyProfile
                </p>
                <p
                  onClick={() => navigate("/myappointments")}
                  className="hover:text-black cursor-pointer"
                >
                  {" "}
                  MyAppointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div> 
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-900 px-8 py-3 rounded-full text-white font-light hidden md:block cursor-pointer"
          >
            Create Account
          </button>
        )}
        <img
          className="w-6 md:hidden"
          src={assets.menu_icon}
          onClick={() => setShowMenu(true)}
        />
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <img src={assets.logo} className="w-28" alt="logo" />
              <img
                src={assets.cross_icon}
                className="w-6 cursor-pointer"
                onClick={() => setShowMenu(false)}
                alt="close"
              />
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col items-center gap-6 mt-10 text-gray-700 font-medium">
              <NavLink
                to="/"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }
              >
                HOME
              </NavLink>

              <NavLink
                to="/doctors"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }
              >
                DOCTORS
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }
              >
                ABOUT
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive ? "text-blue-500" : "hover:text-blue-500"
                }
              >
                CONTACT
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
