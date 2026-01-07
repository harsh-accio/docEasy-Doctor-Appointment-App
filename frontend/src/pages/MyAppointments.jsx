import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backend_url, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/cancel-appointments`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backend_url}/api/user/verifyRazorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: { token } }
          );

          if (data.success) {
            navigate("/myappointments");
            getUserAppointments();
            
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-green-950 mb-6">
          My Appointments
        </h1>

        {/* Appointment List */}
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row md:items-center gap-6"
            >
              {/* Doctor Image */}
              <div className="shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-lg object-cover border border-gray-200"
                />
              </div>

              {/* Doctor Details */}
              <div className="flex-1 text-gray-700">
                <h2 className="text-lg font-semibold text-gray-900">
                  Dr. {item.docData.name}
                </h2>
                <p className="text-green-800 text-sm font-medium">
                  {item.docData.speciality}
                </p>

                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-800">Address</p>
                  <p>{item.docData.address}</p>
                  <p>{item.docData.address}</p>
                </div>

                <p className="mt-2 text-sm">
                  <span className="font-medium text-gray-800">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime} AM
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full md:w-40">
                {/* ✅ Paid */}
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="bg-green-600 text-white py-2 rounded-lg text-sm font-medium cursor-default">
                    Paid
                  </button>
                )}

                {/* ✅ Not paid & not cancelled */}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <>
                    <button
                      onClick={() => appointmentRazorpay(item._id)}
                      className="bg-green-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-950 transition"
                    >
                      Pay Online
                    </button>

                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="border border-gray-300 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}

                {/* ✅ Cancelled */}
                {item.cancelled && !item.isCompleted && (
                  <button className="border border-gray-300 text-red-400 py-2 rounded-lg text-sm font-medium cursor-default">
                    Appointment Cancelled
                  </button>
                )}
                {
                  item.isCompleted && <button className='sm:min-w-40 py-1 px-2 border border-green-500 rounded text-green-500   '>Completed</button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
