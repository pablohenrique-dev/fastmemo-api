import { Router } from "express";
import { CardsTodayController } from "../controllers/CardsTodayController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const cardsTodayController = new CardsTodayController();

export const cardsTodayRouter = Router();

cardsTodayRouter.get(
  "/:deckId",
  ensureAuthenticated,
  cardsTodayController.index
);
