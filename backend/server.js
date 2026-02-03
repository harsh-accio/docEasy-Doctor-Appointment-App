import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

//Connection
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/test',(req,res)=>res.send("Heloo"));
//localhost:8000/api/admin/add-doctor
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user/", userRoutes);

app.listen(port, () => {
  console.log("Listening...");
});
