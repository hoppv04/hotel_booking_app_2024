import express from "express";
import { hotelDetails, searchHotel } from "../controllers/hotels.controller.js";
import { param } from "express-validator";

const router = express.Router();

router.get("/search", searchHotel);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is required")],
  hotelDetails
);

export default router;
