import { Router } from "express";
import { SessionsController } from "../controllers/SessionsController";

const sessionsController = new SessionsController();

export const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.create);
