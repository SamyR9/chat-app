import express from "express"

const router = express.Router();

// /api/auth/login
router.get("/login", (req, res) => {
  res.send("Logged in successfully")
})

// /api/auth/logout
router.get("/logout", (req, res) => {
  res.send("Logged out successfully")
})

// /api/auth/signup
router.get("/signup", (req, res) => {
  res.send("Signed up successfully")
})

export default router