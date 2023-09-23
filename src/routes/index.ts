import { Router } from "express";
import { userRouter } from "./user.routes";
import { deckRouter } from "./deck.routes";
import { sessionsRouter } from "./sessions.routes";
import { validateRouter } from "./validate.routes";
import { cardRouter } from "./card.routes";

export const routes = Router();

routes.use("/user", userRouter);
routes.use("/deck", deckRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/validate", validateRouter);
routes.use("/card", cardRouter);
