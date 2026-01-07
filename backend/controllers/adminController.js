import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorsModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";

// api for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      speciality,
      degree,
      experience,
      about,
      fees,
    } = req.body;

    // ✅ Check image
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.status(400).json({ message: "Data is missing" });
    }

    // ✅ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // ✅ Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Upload image correctly
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    // ✅ Save doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      phone,
      speciality,
      degree,
      address,
      experience,
      about,
      fees,
      date: new Date(),
      image: imageUpload.secure_url,
    });

    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor saved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// api for admin auth
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      process.env.ADMIN_EMAIL == email &&
      process.env.ADMIN_PASSWORD == password
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.send({ success: true, token: token });
    } else {
      return res.send({ message: "Invalid Credintials!" });
    }
  } catch (error) {
    res.send({ message: error });
  }
};

// api for rendering doctor list
const allDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: "Doctor Cant be load at this time" });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // cancel appointment
    appointmentData.cancelled = true;
    await appointmentData.save();

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);
    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = doctorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (time) => time !== slotTime
      );

      // remove empty date entry
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate];
      }
    }

    doctorData.slots_booked = slots_booked;
    await doctorData.save();

    return res.json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  adminLogin,
  allDoctor,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard,
};
