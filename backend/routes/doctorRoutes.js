import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorLogin,
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRoutes = express.Router();

doctorRoutes.get("/doctorlist", doctorList);
doctorRoutes.post("/login", doctorLogin);
doctorRoutes.get("/appointments", authDoctor, appointmentsDoctor);
doctorRoutes.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRoutes.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRoutes.get("/dashboard", authDoctor, doctorDashboard);
doctorRoutes.get("/profile", authDoctor, getDoctorProfile);
doctorRoutes.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRoutes;
