import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes ,useNavigate} from "react-router-dom";
import { Route } from "react-router-dom";
import AddDoctor from "./components/Admin/AddDoctor";
import Dashboard from "./components/Admin/Dashboard";
import Appointments from "./components/Admin/Appointments";
import DoctorList from "./components/Admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import DoctorAppointments from "./components/Doctor/DoctorAppointments";
import DoctorProfile from "./components/Doctor/DoctorProfile";

const App = () => {
  const { authtoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);
  const Navigate = useNavigate()

  // NOT LOGGED IN
  if (!authtoken && !doctortoken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-6">
          <Routes>

            {/* ================= ADMIN ================= */}
            {authtoken && (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/my-appointments" element={<Appointments />} />
                <Route path="/doctor-list" element={<DoctorList />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </>
            )}

            {/* ================= DOCTOR ================= */}
            {doctortoken && (
              <>
                <Route path="/" element={<DoctorDashboard />}  />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route
                  path="/doctor-appointments"
                  element={<DoctorAppointments />}
                />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
              </>
            )}

          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
