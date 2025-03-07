import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  registerValidations,
  loginValidations,
} from "../validations/auth.validator.js";

const router = express.Router();

// Register route with validation
router.post("/register", registerValidations, validateRequest, register);

// Login route with validation
router.post("/login", loginValidations, validateRequest, login);

// Get user profile (protected route)
router.get("/me", protect, getProfile);

export default router;
