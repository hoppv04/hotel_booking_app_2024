import express from "express";
import { param } from "express-validator";
import {
  bookHotelWithPayment,
  hotelBooking,
  hotelDetails,
  searchHotel,
} from "../controllers/hotels.controller.js";
import verifyToken from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/search", searchHotel);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is required")],
  hotelDetails
);
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  bookHotelWithPayment
);
router.post("/:hotelId/bookings", verifyToken, hotelBooking);

export default router;
