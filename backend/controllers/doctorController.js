import doctorModel from "../models/doctorsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js ";
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Changed" });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-email -password");

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while getting doctors" });
  }
};

// api for doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      res.json({ success: false, message: "No such account found" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while getting doctor.." });
  }
};

//api for getting appointment for doctor
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to mark appointment complete for doctor at thier dashboard
const appointmentComplete = async (req, res) => {
  const docId = req.doctor.id;
  const { appointmentId } = req.body;

  const appointmentData = await appointmentModel.findById(appointmentId);
  if (appointmentData && appointmentData.docId.toString() == docId) {
    await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { isCompleted: true },
      { new: true }
    );
    return res.json({ success: true, message: "Appointment Completed" });
  } else {
    res.json({ success: false, message: "Failed to set complete" });
  }
};

// api to mark appointment cancel for doctor at thier dashboard
const appointmentCancel = async (req, res) => {
  const docId = req.doctor.id;
  const { appointmentId } = req.body;

  const appointmentData = await appointmentModel.findById(appointmentId);
  if (appointmentData && appointmentData.docId == docId) {
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    return res.json({ success: true, message: "Appointment Cancelled" });
  } else {
    res.json({ success: false, message: "Failed to set cancel" });
  }
};

// api for doctor dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const appointments = await appointmentModel.find({ docId });
    let earning = 0;
    appointments.map((item, index) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    });
    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });
    let dashboardData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
    };
    res.json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get doctor profile for doctor pannel
const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const profileData = await doctorModel.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to update doctor profile data
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  changeAvailablity,
  doctorList,
  doctorLogin,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
};
