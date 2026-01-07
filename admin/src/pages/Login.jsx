import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAuthtoken, backend_url } = useContext(AdminContext);
  const { setDoctorToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backend_url}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("Authtoken", JSON.stringify(data.token));
          setAuthtoken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backend_url}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("DoctorToken", JSON.stringify(data.token));
          setDoctorToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-500">
            {state === "Admin" ? "Admin Login" : "Doctor Login"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your dashboard securely
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2.5 rounded-lg 
                     font-medium hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        {/* Toggle Role */}
        <p className="text-center text-sm text-gray-600 mt-5">
          {state === "Admin" ? (
            <>
              Are you a Doctor?
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("Doctor")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Are you an Admin?
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setState("Admin")}
              >
                Login here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
