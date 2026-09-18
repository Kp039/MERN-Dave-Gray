import express from "express";
import userController from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";

export const userRouter = express.Router();

userRouter.use(verifyJWT);

userRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
