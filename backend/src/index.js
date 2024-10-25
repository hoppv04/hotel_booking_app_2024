import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./configs/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";
import myHotelsRoutes from "./routes/my-hotels.route.js";
import hotelRoutes from "./routes/hotels.route.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelsRoutes);
app.use("/api/hotels", hotelRoutes);

app.listen(7000, () => {
  console.log(`Server is running on localhost:7000 `);
  connectMongoDB();
});
