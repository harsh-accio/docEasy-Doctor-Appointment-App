import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { authtoken, setAuthtoken } = useContext(AdminContext);
  const {doctortoken,setDoctorToken} = useContext(DoctorContext)
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    authtoken && setAuthtoken("");
    authtoken && localStorage.removeItem("Authtoken");
    doctortoken && setDoctorToken('')
    doctortoken && localStorage.removeItem('DoctorToken')
  };
  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-8">
      {/* Left: Logo + Role */}
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="logo"
          className="w-10 h-10 object-contain"
        />
        <p className="text-lg font-semibold text-gray-700">
          {authtoken ? "Admin Panel" : "Doctor Panel"}
        </p>
      </div>

      {/* Right: Logout */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
