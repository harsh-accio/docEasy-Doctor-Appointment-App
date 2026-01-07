import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [authtoken, setAuthtoken] = useState(
    localStorage.getItem("Authtoken")
      ? JSON.parse(localStorage.getItem("Authtoken"))
      : ""
  );
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/all-doctor`,
        {},
        { headers: { authtoken } }
      );
      console.log(data);

      if (data.success) {
        setDoctors(data.doctors);
        console.log(doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/change-availability`,
        { docId },
        { headers: { authtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const allAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/admin/appointments`,
        { headers: { authtoken } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
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
        `${backend_url}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { authtoken } }
      );
      if (data.success) {
        toast.success(data.message);
        allAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/admin/dashboard`, {
        headers: { authtoken },
      });
      if (data.success) {
        toast.success(data.message);
        setDashData(data.dashData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    authtoken,
    setAuthtoken,
    backend_url,
    getAllDoctors,
    doctors,
    changeAvailability,
    appointments,
    setAppointments,
    allAppointments,
    cancelAppointment,
    dashData,
    getDashData
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
