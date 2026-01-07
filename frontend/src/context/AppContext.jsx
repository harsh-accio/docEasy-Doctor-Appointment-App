import { createContext } from "react";
// import { doctors } from '../assets/assets';
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : false
   );
   const [userData,setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/doctor/doctorlist`);
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
  useEffect(() => {
    getDoctorsData();
  }, []);
  const loadUserProfileData = async()=>{
    try {
      const { data } = await axios.get(`${backend_url}/api/user/get-profile`,{headers:{token}});
      if(data.success){
        setUserData(data.userData);
      }else{
           toast.error(data.message); 
      }
    } catch (error) {
      console.log(token);
       toast.error('error while getting user data');
    }
  }
  useEffect(()=>{
   if(token){
     loadUserProfileData() 
   }
  },[token])

  const value = { doctors,getDoctorsData, token, setToken, backend_url, userData,setUserData,loadUserProfileData  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
