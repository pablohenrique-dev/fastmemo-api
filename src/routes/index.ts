import { Router } from "express";
import { userRouter } from "./user.routes";
import { deckRouter } from "./deck.routes";
import { sessionsRouter } from "./sessions.routes";

export const routes = Router();

routes.use("/user", userRouter);
routes.use("/deck", deckRouter);
routes.use("/sessions", sessionsRouter);
