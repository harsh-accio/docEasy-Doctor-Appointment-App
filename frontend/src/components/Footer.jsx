import React from "react";
import { assets } from "../assets/assets";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          {/* Left */}
          <img className="mb-5 w-40" src={assets.applogo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
            quisquam, nostrum debitis perferendis dicta assumenda voluptatem vel
            ullam sequi obcaecati labore veniam! At cumque ipsum numquam
            distinctio dignissimos, porro illo!
          </p>
        </div>

        <div>
          {/* Center */}
          <p className="text-xl font-medium mb-5 text-green-950">COMPANY</p>
          <ul className="flex flex-col gap-2 text-green-950 cursor-pointer ">
            <li className="hover:text-black">Home</li>
            <li className="hover:text-black">About</li>
            <li className="hover:text-black">Contact</li>
            <li className="hover:text-black">Privacy Policy</li>
          </ul>
        </div>

        <div>
          {/* Right */}
          <p className="text-xl font-medium mb-5 text-green-950">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600 cursor-pointer">
            <li>+91 7689965634</li>
            <li>doceasy@business.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-200" />
        <p className="text-sm text-center py-5">
          Copyrigh@2024 All right reserved to Company
        </p>
        <p className="text-sm py-3 flex items-center justify-center gap-1">
          Developed by Harsh with{" "}
          <Heart className="inline w-4 h-4 text-black-500" />
        </p>
      </div>
    </div>
  );
};

export default Footer;
