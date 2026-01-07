import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { authtoken, backend_url } = useContext(AdminContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!docImg) {
      return toast.error("Please set the profile image");
    }

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience); // ✅ fixed
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        // ✅ await added
        `${backend_url}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            authtoken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setAbout('')
          setAddress1('')
          setAddress2('')
          setDegree('')
          setDocImg(false)
          setName('')
          setEmail('')
          setFees('')
          setDegree('')
          setPassword('')
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <form className="m-5 w-full" onSubmit={submitHandler}>
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-100 rounded  w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex item-center mb-8 gap-4 text-gray-500 ">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer "
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row item-start gap-10 text-gray-600 ">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-3">
              <p> Doctor Name</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="text"
                placeholder=" Doctor name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <p> Doctor Email</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="email"
                placeholder=" Doctor Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <p> Doctor Password</p>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="password"
                placeholder=" Doctor Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <p> Doctor Experience</p>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <p>Fees</p>
              <input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="number"
                placeholder="Fee"
                required
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-3">
              <p>Speciality</p>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                name=""
                id=""
              >
                <option value="General Physcian">General Physcian</option>
                <option value="Gynologist">Gynologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <p>Education</p>
              <input
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="text"
              />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <p>Address</p>
              <input
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="border border-gray-100 rounded py-2  px-3"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <p className="mt-4 mb-2">About</p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="border border-gray-100 rounded    pt-2 px-4"
            type="text"
            placeholder="About Doctor"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
