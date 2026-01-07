import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const { authtoken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  useEffect(() => {
    if (authtoken) {
      getDashData();
    }
  }, [authtoken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className='flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer '>
            <img className='w-14' src={assets.doctor_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
              <p className='text-gray-400'>Doctors</p>
            </div>
          </div>

          <div className='flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer '>
            <img className='w-14' src={assets.appointments_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
              <p className='text-gray-400'>Appointments</p>
            </div>
          </div>

          <div className='flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer '>
            <img className='w-14' src={assets.patients_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
              <p className='text-gray-400'>Patients</p>
            </div>
          </div>
        </div>
        <div>
          
        </div>
      </div>
    )
  );
};

export default Dashboard;
