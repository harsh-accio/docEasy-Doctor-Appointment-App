import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backend_url, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("phone", userData.phone);
      image && formData.append("image", image);
       
    
      

      const { data } = await axios.post(
        `${backend_url}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen  px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    className="w-28 h-28 rounded-4xl object-cover border-4 border-green-950 opacity-75"
                  />
                  {/* <img src={image? '': assets.upload_icon }  className={image ? '':'w-28 h-28 rounded-full object-cover border-4 border-blue-500'} /> */}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-green-950"
              />
            )}

            <div className="text-center sm:text-left w-full">
              {isEdit ? (
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="text-xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-green-950 w-full"
                />
              ) : (
                <p className="text-2xl font-semibold text-gray-800">
                  {userData.name}
                </p>
              )}

              <button
                onClick={() => setEdit(!isEdit)}
                className="mt-3 text-sm text-green-950 font-bold hover:underline"
              >
                {isEdit ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>

          <hr className="my-8" />

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-semibold text-green-950 mb-4">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-950"
                  />
                ) : (
                  <p className="font-medium">{userData.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-950 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-950 focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="font-medium">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          <hr className="my-8" />

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-green-950 mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-950 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="font-medium">{userData.gender}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-950 focus:outline-none"
                  />
                ) : (
                  <p className="font-medium">{userData.dob}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center sm:justify-end">
            {isEdit ? (
              <button
                onClick={()=>updateUserProfile()}
                className="bg-green-950 text-white px-6 py-2.5 rounded-lg text-sm font-medium 
                 hover:bg-green-950 transition duration-200 shadow-sm"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setEdit(true)}
                className="border bg-green-950 text-white px-6 py-2.5 rounded-lg 
                 text-sm font-medium hover:bg-green-950 transition duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
