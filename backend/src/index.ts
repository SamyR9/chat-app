import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())

const PORT = 5000

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`)
})