import express from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 and more characters required").isLength({
      min: 6,
    }),
  ],
  login
);

export default router;
