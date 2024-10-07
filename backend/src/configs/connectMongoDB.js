import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect to MongoDB failed", error);
  }
};

export default connectMongoDB;
