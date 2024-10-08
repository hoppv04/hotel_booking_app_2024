import express from "express";
import { check } from "express-validator";
import { register } from "../controllers/user.controller.js";

const router = express.Router();

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
