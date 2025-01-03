import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express()

const PORT = 5000

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
  console.log(`Server started on port : ${PORT}`)
})