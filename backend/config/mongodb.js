import mongoose from "mongoose";

const connectDB = () => {
  console.log(process.env.MONGO_URL);

  mongoose
    .connect(`${process.env.MONGO_URL}/Curonex`)
    .then(() => {
      console.log("Connected..");
    })
    .catch((err) => console.log("Error while connecting.."));
};

export default connectDB;
