import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

const DoctorDashboard = () => {
  const { doctortoken, dashData, setDashData, getDashData } =
    useContext(DoctorContext);
  useEffect(() => {
    if (doctortoken) {
      getDashData();
    }
  }, [doctortoken]);
  return (
    dashData && (
      <div className="w-full p-5">
        <p className="text-xl font-semibold text-gray-800 mb-6">
          Doctor Dashboard
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Appointments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {dashData.appointments}
            </p>
          </div>

          {/* Patients */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {dashData.patients}
            </p>
          </div>

          {/* Earnings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              ₹{dashData.earning}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
