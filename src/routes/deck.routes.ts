import { Router } from "express";
import { DeckController } from "../controllers/DeckController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const deckController = new DeckController();

export const deckRouter = Router();

deckRouter.get("/:deckId", ensureAuthenticated, deckController.show);
deckRouter.get("/", ensureAuthenticated, deckController.index);
deckRouter.post("/", ensureAuthenticated, deckController.create);
deckRouter.put("/:deckId", ensureAuthenticated, deckController.update);
deckRouter.delete("/:deckId", ensureAuthenticated, deckController.delete);
