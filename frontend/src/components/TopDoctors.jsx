import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className=" sm:w-1/3 text-center text-sm ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div
        className="w-full grid gap-4 gap-y-6 pt-5 px-3 md:px-0"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
          >
            <img src={item.image} className="bg-blue-50" />
            <div className="p-4">
              <div className={`flex item-center gap-2 text-sm text-center ${item.available?'text-green-500':'text-red-500'}`}> 
                <p className={`w-2 h-2 mt-1 rounded-full ${item.available?'bg-green-500':'bg-red-500'}`}></p>
                <p>{item.available ? "Available":"Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-600 ">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-6"
      onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
