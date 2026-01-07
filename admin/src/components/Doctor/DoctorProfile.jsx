import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctortoken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backend_url } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (doctortoken) {
      getProfileData();
    }
  }, [doctortoken]);

  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    const addressObj = JSON.parse(profileData.address || "{}");
    setProfileData((prev) => ({
      ...prev,
      address: JSON.stringify({
        ...addressObj,
        [field]: value,
      }),
    }));
  };

  const saveInfo = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/update-profile`,
        {
          fees: profileData.fees,
          available: profileData.available,
          address: profileData.address,
        },
        { headers: { doctortoken: doctortoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!profileData) return null;

  const address = JSON.parse(profileData.address || "{}");

  return (
    <div className="w-full max-w-5xl mx-auto p-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Doctor Profile
          </h2>
          {isEdit ? (
            <button
              onClick={saveInfo}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
            >
              Save Info
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border px-5 py-2 rounded-lg text-sm"
            >
              Edit
            </button>
          )}
        </div>

        {/* Top */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={profileData.image}
            className="w-32 h-32 rounded-full object-cover border"
          />

          <div className="flex-1">
            <h3 className="text-2xl font-semibold">{profileData.name}</h3>
            <p className="text-gray-600">{profileData.speciality}</p>

            <div className="flex gap-3 mt-3 text-sm">
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                {profileData.degree}
              </span>
              <span className="bg-green-50 px-3 py-1 rounded-full">
                {profileData.experience}
              </span>
            </div>

            {/* Fees */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Fees</p>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => handleChange("fees", e.target.value)}
                  className="border px-3 py-2 rounded w-40"
                />
              ) : (
                <p className="font-medium">
                  {currency}
                  {profileData.fees}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Availability</p>
              {isEdit ? (
                <select
                  value={profileData.available}
                  onChange={(e) =>
                    handleChange("available", e.target.value === "true")
                  }
                  className="border px-3 py-2 rounded"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              ) : (
                <p
                  className={`font-medium ${
                    profileData.available ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {profileData.available ? "Available" : "Not Available"}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="my-6" />

        {/* Address */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Address</h4>
          {isEdit ? (
            <div className="space-y-2">
              <input
                value={address.line1 || ""}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                placeholder="Address Line 1"
                className="border px-3 py-2 rounded w-full"
              />
              <input
                value={address.line2 || ""}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                placeholder="Address Line 2"
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              {address.line1}
              <br />
              {address.line2}
            </p>
          )}
        </div>

        {/* About (read-only) */}
        <div>
          <h4 className="font-medium mb-2">About</h4>
          <p className="text-sm text-gray-600">{profileData.about}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
