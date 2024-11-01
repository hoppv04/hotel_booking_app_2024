import express from "express";
import { check } from "express-validator";
import { getInfoUser, register } from "../controllers/user.controller.js";
import verifyToken from "./../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", verifyToken, getInfoUser);
router.post(
  "/register",
  [
    check("firstName", "First name is required and should be a string")
      .isString()
      .notEmpty(),
    check("lastName", "Last name is required and should be a string")
      .isString()
      .notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  register
);

export default router;
