import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, default: `${process.env.DEFAULT_IMAGE}` },
  address: {
    line1: { type: String, default: "" },
    line2: { type: String, default: "" },
  },
  password: { type: String, required: true },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "000000000" },
  gender: { type: String, default: "Not Selected" },
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
