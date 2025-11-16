import { Router } from "express";
import { AuthController } from "../controllers/auth/PostLogin.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../schemas/login.schema.js";

const router = Router();
const authController = new AuthController();

router.post("/login", validate(loginSchema), authController.handle.bind(authController));

export default router;
