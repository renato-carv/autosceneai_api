import { Router } from "express";
import multer from "multer";
import { PostChatController } from "../controllers/chat/PostChat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const upload = multer();
const router = Router();
const chatController = new PostChatController();

router.post(
  "/chat",
  authMiddleware,
  upload.single("image"),
  chatController.handle.bind(chatController)
);

export default router;
