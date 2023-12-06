import { Router } from "express";
import { userRouter } from "./user.routes";
import { deckRouter } from "./deck.routes";
import { sessionsRouter } from "./sessions.routes";
import { validateRouter } from "./validate.routes";
import { cardRouter } from "./card.routes";
import { cardsTodayRouter } from "./cardsToday.routes";
import { reviewCardCounterRouter } from "./reviewCardCounter.routes";

export const routes = Router();

routes.use("/user", userRouter);
routes.use("/deck", deckRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/validate", validateRouter);
routes.use("/card", cardRouter);
routes.use("/cards-today", cardsTodayRouter);
routes.use("/review-card-counter", reviewCardCounterRouter);
