import jwt from "jsonwebtoken"
import { Response  } from "express"

const generateToken = (userId: String, res: Response) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: "15d"})
  res.cookie("jwt", token, {
    maxAge:15 * 24 * 60 * 60 * 1000, // ms
    httpOnly: true, // prevent xss - not accessible from js
    sameSite: "strict", // prevent csrf
    secure: process.env.NODE_ENV !== "development"
  })

  return token
} 

export default generateToken