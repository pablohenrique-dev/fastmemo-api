import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const userController = new UserController();

export const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.put("/", ensureAuthenticated, userController.update);
