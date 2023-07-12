import { signup, login } from "../controllers/AuthController.js";
import { Router } from "express";
import { userVerification } from "../middlewares/AuthMiddleware.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/", userVerification);

export default router;