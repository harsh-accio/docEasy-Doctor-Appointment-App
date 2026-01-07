import React, { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Appointments = () => {
  const { authtoken, appointments, allAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, Currency } = useContext(AppContext);
  useEffect(() => {
    if (authtoken) {
      allAppointments();
    }
  }, [authtoken]);

  return (
  <div className="w-full max-w-6xl m-5">
    <p className="mb-3 text-lg font-medium">All Appointments</p>

    <div className="bg-white border border-gray-100 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">

      {/* Header */}
      <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {/* Rows */}
      {appointments.map((item, index) => (
        <div
          key={item._id}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-3 items-center py-3 px-6 border-b hover:bg-gray-50"
        >
          <p className="hidden sm:block">{index + 1}</p>

          {/* Patient */}
          <div className="flex items-center gap-3">
            <img className="w-8 h-8 rounded-full" src={item.userData.image} />
            <p>{item.userData.name}</p>
          </div>

          {/* Age */}
          <p className="hidden sm:block">
            {calculateAge(item.userData.dob)}
          </p>

          {/* Date */}
          <p>
            {slotDateFormat(item.slotDate)}, {item.slotTime}
          </p>

          {/* Doctor */}
          <div className="flex items-center gap-3">
            <img className="w-8 h-8 rounded-full" src={item.docData.image} />
            <p>{item.docData.name}</p>
          </div>

          {/* Fees */}
          <p>
            {Currency}
            {item.amount}
          </p>

          {/* Action */}
          {item.cancelled ? (
            <p className="text-red-400 text-xs font-medium">Cancelled</p>
          ) : item.isCompleted? <p className="text-green-500 text-xs font-medium">Completed</p>:(
            <img
              onClick={() => {
                console.log("CANCEL CLICKED:", item._id);
                cancelAppointment(item._id);
              }}
              className="w-6 cursor-pointer hover:scale-110 transition"
              src={assets.cancel_icon}
              alt="Cancel"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

};

export default Appointments;
