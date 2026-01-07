import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className="flex bg-[linear-gradient(124.19deg,#092635,#1b4242_99.39%)] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 ">

      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointments</p>
          <p className="mt-4">With 100+ trusted doctors</p>
        </div>
        <button 
        onClick={()=>navigate('/login')}
        className="bg-white text-sm  text-gray-600 px-8 py-3 rounded-full mt-6 cursor-pointer">Create Account</button>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-92.5 relative">
        <img className="w-18xl h-80 bottom-0 absolute right-0 max-w-md" src={assets.banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
