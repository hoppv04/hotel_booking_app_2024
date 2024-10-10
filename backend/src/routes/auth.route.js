import express from "express";
import { check } from "express-validator";
import { login, logout } from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/auth.middleware.js";

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
router.post("/logout", logout);

router.get("/validate-token", verifyToken, (req, res) =>
  res.status(200).send({ userId: req.userId })
);

export default router;
