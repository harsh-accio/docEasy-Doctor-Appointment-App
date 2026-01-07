import React from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center text-gray-800 gap-4 py-16">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsum
        dolorem modi.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
        {specialityData.map((item, index) => {
            return (
          <Link onClick={()=>scrollTo(0,0)} key={index} to={`doctors/${item.speciality}`} className="flex flex-col items-center text-xs cursor-pointer shrink-0">
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
            )
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
