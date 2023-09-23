import { Router } from "express";
import { CardsController } from "../controllers/CardsController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const cardsController = new CardsController();

export const cardRouter = Router();

cardRouter.get("/:deckId", ensureAuthenticated, cardsController.index);
cardRouter.post("/", ensureAuthenticated, cardsController.create);
cardRouter.put("/:cardId", ensureAuthenticated, cardsController.update);
cardRouter.delete("/:cardId", ensureAuthenticated, cardsController.delete);
