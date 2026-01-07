import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const ApplyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    ApplyFilter();
  }, [speciality, doctors]);
  return (
    <div>
      <p className="text-gray-600">Browse through the Doctors</p>
      <button
        className="py-1 my-3 px-3 border border-gray-300 rounded text-sm transition-all "
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filter
      </button>
      <div className="flex flex-col sm:flex-row item-start gap-5 mt-5">
        {showFilter && (
          <div className="flex flex-col gap-4 text-sm text-gray-600 mt-6">
            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Gynecologist" ? "bg-indigo-200 text-black" : ""
              }`}
            >
              Gynecologist
            </p>
            <p
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "General physician"
                  ? "bg-indigo-200 text-black"
                  : ""
              }`}
            >
              General physician
            </p>
            <p
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Dermatologist" ? "bg-indigo-200 text-black" : ""
              }`}
            >
              Dermatologist
            </p>
            <p
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Pediatricians" ? "bg-indigo-200 text-black" : ""
              }`}
            >
              Pediatricians
            </p>
            <p
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Neurologist" ? "bg-indigo-200 text-black" : ""
              }`}
            >
              Neurologist
            </p>
            <p
              onClick={() =>
                speciality === "Gastroenterologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gastroenterologist")
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === "Gastroenterologist"
                  ? "bg-indigo-200 text-black"
                  : ""
              }`}
            >
              Gastroenterologist
            </p>
          </div>
        )}
        <div
          className="w-full grid gap-4 gap-y-6 pt-5 px-3 md:px-0"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
            >
              <img src={item.image} className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex item-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 mt-1 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-600 ">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
