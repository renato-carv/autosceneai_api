import { Router } from 'express';
import { PostChatController } from '../controllers/chat/PostChat.controller.js';
import { chatSchema } from '../schemas/chat.schema.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();
const chatController = new PostChatController();

router.post(
  '/chat',
  authMiddleware,
  validate(chatSchema),
  chatController.handle.bind(chatController),
);

export default router;
