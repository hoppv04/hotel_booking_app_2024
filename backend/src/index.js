import cors from "cors";
import "dotenv/config";
import express from "express";
import connectMongoDB from "./configs/connectMongoDB.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/api/test", async (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(7000, () => {
  console.log(`Server is running on localhost:7000 `);
  connectMongoDB();
});
