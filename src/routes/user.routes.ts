import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userController = new UserController();

export const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.post("/:userId", userController.update);
