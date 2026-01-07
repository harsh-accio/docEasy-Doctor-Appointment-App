import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  listAppointment,
  loginUser,
  paymentRazorpay,
  registerUser,
  updateProfile,
  userProfile,
  verifyRazorpay,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/get-profile", authUser, userProfile);
userRoutes.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRoutes.post("/book-appointment", authUser, bookAppointment);
userRoutes.get("/appointments", authUser, listAppointment);
userRoutes.post("/cancel-appointments", authUser, cancelAppointment);
userRoutes.post("/payment-razorpay", authUser, paymentRazorpay);
userRoutes.post("/verifyRazorpay", authUser, verifyRazorpay);

export default userRoutes;
