import express from "express"
import middleware from "../middleware/middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get('/conversations', middleware, getUsersForSidebar)

router.post("/send/:id", middleware, sendMessage)

router.get('/:id', middleware, getMessages)

export default router