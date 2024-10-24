import express from "express";
import { body } from "express-validator";
import multer from "multer";
import {
  addHotel,
  editMyHotel,
  getHotelById,
  getMyHotels,
} from "../controllers/hotel.controller.js";
import verifyToken from "./../middlewares/auth.middleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  addHotel
);
router.get("/", verifyToken, getMyHotels);
router.get("/:id", verifyToken, getHotelById);
router.put("/:hotelId", verifyToken, upload.array("imageFiles"), editMyHotel);

export default router;
