import { Router } from "express";
import { ReviewCardCounterController } from "../controllers/ReviewCardCounterController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const reviewCardCounterController = new ReviewCardCounterController();

export const reviewCardCounterRouter = Router();

reviewCardCounterRouter.put("/:cardId", ensureAuthenticated, reviewCardCounterController.update);
reviewCardCounterRouter.get("/", ensureAuthenticated, reviewCardCounterController.index);
