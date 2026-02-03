import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { authtoken } = useContext(AdminContext);
  const {doctortoken} = useContext(DoctorContext)

  return (
  <div className="flex min-h-screen bg-gray-50">
    
    {/* ADMIN SIDEBAR */}
    {authtoken && (
      <aside className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6">
        <ul className="space-y-2">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.home_icon} className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/my-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.appointment_icon} className="w-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.add_icon} className="w-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.people_icon} className="w-5" />
            <p>Doctor List</p>
          </NavLink>

        </ul>
      </aside>
    )}

    {/* DOCTOR SIDEBAR */}
    {doctortoken && (
      <aside className="w-64 min-h-screen bg-white border-r shadow-sm px-4 py-6">
        <ul className="space-y-2">

          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.home_icon} className="w-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.appointment_icon} className="w-5" />
            <p>Appointments</p>
          </NavLink>
           <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <img src={assets.appointment_icon} className="w-5" />
            <p>Profile</p>
          </NavLink>

        </ul>
      </aside>
    )}

   

  </div>
);

};

export default Sidebar;
