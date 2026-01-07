import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-3xl pt-10 text-green-950 font-bold">
        <p>About Us</p>
      </div>
      <div className="flex flex-col md:flex-row my-10 gap-12">
        <img src={assets.about_image} className="w-full max-w-90  " />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            veniam, aliquam voluptatibus placeat nemo aperiam. Lorem, ipsum
            dolor sit amet consectetur adipisicing elit. Nisi voluptatem soluta
            eaque veniam, rem debitis ipsum nesciunt quo consequatur quasi.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo,
            possimus maxime? Officiis voluptatum doloremque neque modi! Quasi
            similique ipsa consequuntur?
          </p>
          <b>Our Vision</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A excepturi
            deserunt consectetur delectus nostrum unde aliquid itaque aliquam
            blanditiis. Reiciendis.
          </p>
        </div>
      </div>
      <div>
        <p className="text-xl text-green-950 font-bold">WHY CHOOSE US</p>
      </div>
      <div className="flex flex-col md:flex-row mt-8 mb-20  ">
        <div className="flex flex-col border  gap-5 px-10 md:px-16 py-8 sm:py-16">
          <p className="text-xl text-gray-600 text-center">Determination</p>
          <p className="text-sm text-gray-400 text-start">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, facilis.</p>
        </div>
        <div className="flex flex-col border  gap-5 px-10 md:px-16 py-8 sm:py-16">
         
          <p className="text-xl text-gray-600 text-center">Achievment</p>
          <p className="text-sm text-gray-400 text-start">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum aliquam, facere quibusdam deleniti eveniet fuga!</p>
        </div>
        <div className="flex flex-col border  gap-5 px-10 md:px-16 py-8 sm:py-16">
          <p className="text-xl text-gray-600 text-center">Succes</p>
          <p className="text-sm text-gray-400 text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ipsam suscipit. Placeat eligendi cumque soluta?</p>
        </div>
      </div>
    </div>
  );
};

export default About;
