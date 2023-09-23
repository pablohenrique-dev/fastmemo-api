import { Router } from "express";
import { ValidateTokenController } from "../controllers/ValidateTokenController";

const validateTokenController = new ValidateTokenController();

export const validateRouter = Router();

validateRouter.post("/", validateTokenController.create);
