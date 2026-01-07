import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    doctortoken,
    appointments,
    setAppointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  useEffect(() => {
    if (doctortoken) {
      getAppointments();
    }
  }, [doctortoken]);
  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      {" "}
      <p className="mb-4 text-lg font-semibold text-gray-800">
        {" "}
        My Appointments{" "}
      </p>{" "}
      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        {" "}
        {/* Table Header */}{" "}
        <div className="hidden md:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] px-6 py-3 border-b bg-gray-50 text-sm font-medium text-gray-600">
          {" "}
          <p>#</p> <p>Patient</p> <p>Age</p> <p>Date & Time</p> <p>Fees</p>{" "}
          <p>Contact</p> <p>Payment Mode</p> <p>Action</p>{" "}
        </div>{" "}
        {/* Table Rows */}{" "}
        {appointments.reverse().map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col md:grid md:grid-cols-[0.5fr_2.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] gap-3 md:gap-0 px-6 py-4 border-b text-sm text-gray-700 hover:bg-gray-50"
          >
            {" "}
            {/* Index */} <p className="hidden md:block">{index + 1}</p>{" "}
            {/* Patient */}{" "}
            <div className="flex items-center gap-3">
              {" "}
              <img
                src={item.userData.image}
                alt="patient"
                className="w-9 h-9 rounded-full object-cover"
              />{" "}
              <p className="font-medium">{item.userData.name}</p>{" "}
            </div>{" "}
            {/* Age */}{" "}
            <p className="md:block hidden">
              {" "}
              {item.userData.dob
                ? new Date().getFullYear() -
                  new Date(item.userData.dob).getFullYear()
                : "-"}{" "}
            </p>{" "}
            {/* Date & Time */}{" "}
            <p>
              {" "}
              {item.slotDate.replaceAll("_", "/")} <br />{" "}
              <span className="text-xs text-gray-500">{item.slotTime}</span>{" "}
            </p>{" "}
            <div>
              {" "}
              <p className="text-xs">{item.amount}</p>{" "}
            </div>{" "}
            {/* Contact */}{" "}
            <div>
              {" "}
              <p className="text-xs">{item.userData.phone || "-"}</p>{" "}
            </div>{" "}
            {/* Fees */}{" "}
            <p className="font-medium">{item.payment ? "Online" : "Cash"}</p>{" "}
            {/* Status */}{" "}
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                {" "}
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  className="w-10 cursor-pointer"
                />{" "}
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  className="w-10 cursor-pointer"
                />{" "}
              </div>
            )}{" "}
          </div>
        ))}{" "}
        {appointments.length === 0 && (
          <p className="text-center py-6 text-gray-500 text-sm">
            {" "}
            No appointments found{" "}
          </p>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default DoctorAppointments;
