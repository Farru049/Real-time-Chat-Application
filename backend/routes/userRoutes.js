// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser} from "../controllers/userController.js";

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get user profile (protected route)

export default router;
