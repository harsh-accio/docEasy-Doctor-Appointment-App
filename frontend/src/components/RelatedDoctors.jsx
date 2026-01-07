import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relatedDoctor, setRelatedDoctor] = useState([]);
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (item) => item.speciality === speciality && item._id !== docId.doctorid
      );
      setRelatedDoctor(doctorsData);
      console.log(docId);

      console.log(relatedDoctor);
    }
  }, [docId, speciality, doctors]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctor to Book</h1>
      <div
        className="w-full grid gap-4 gap-y-6 pt-5 px-3 md:px-0"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {relatedDoctor.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
          >
            <img src={item.image} className="bg-blue-50" />
            <div className="p-4">
              <div className="flex item-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 mt-1 rounded-full bg-green-500 "></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-600 ">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
