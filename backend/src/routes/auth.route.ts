import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// /api/auth/login
router.post("/login", login)

// /api/auth/logout
router.post("/logout", logout)

// /api/auth/signup
router.post("/signup", signup)

router.get("/resetPassword", (req, res) => {
  res.send("Signed up successfully")
})

export default router