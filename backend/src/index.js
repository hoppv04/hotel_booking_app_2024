import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./configs/connectMongoDB.js";
import userRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
  console.log(`Server is running on localhost:7000 `);
  connectMongoDB();
});
