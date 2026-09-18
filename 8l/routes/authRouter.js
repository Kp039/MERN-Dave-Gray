import express from "express";
import authController from "../controllers/authController.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

export const authRouter = express.Router();

authRouter.route("/").post(loginLimiter,authController.login);

authRouter.route("/refresh").get(authController.refresh);

authRouter.route("/logout").post(authController.logout);
