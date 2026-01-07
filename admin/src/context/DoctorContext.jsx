import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [doctortoken, setDoctorToken] = useState(
    localStorage.getItem("DoctorToken")
      ? JSON.parse(localStorage.getItem("DoctorToken"))
      : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState({
    appointments: 0,
    patients: 0,
    earning: 0,
  });
  const [profileData, setProfileData] = useState(false);

  //get appointments of doctor by doctor token
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/doctor/appointments`,
        { headers: { doctortoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/complete-appointment`,
        { appointmentId },
        {
          headers: { doctortoken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/cancel-appointment`,
        { appointmentId },
        {
          headers: { doctortoken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/doctor/dashboard`, {
        headers: { doctortoken },
      });
      console.log("API RESPONSE:", data);
      if (data.success) {
        setDashData(data.dashboardData);
        console.log(dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/doctor/profile`, {
        headers: { doctortoken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backend_url,
    doctortoken,
    setDoctorToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
