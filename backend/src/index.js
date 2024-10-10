import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./configs/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/users.route.js";

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

app.listen(7000, () => {
  console.log(`Server is running on localhost:7000 `);
  connectMongoDB();
});
