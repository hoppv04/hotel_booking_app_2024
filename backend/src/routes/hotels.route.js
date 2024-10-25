import express from "express";
import { searchHotel } from "../controllers/hotels.controller.js";

const router = express.Router();

router.get("/search", searchHotel);

export default router;
