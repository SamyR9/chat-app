import express from "express"
import { login, logout, signup, user } from "../controllers/auth.controller.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.get("/user",middleware ,user)

// /api/auth/login
router.post("/login", login)

// /api/auth/logout
router.post("/logout", logout)

// /api/auth/signup
router.post("/signup", signup)

export default router