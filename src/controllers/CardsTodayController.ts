import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export class CardsTodayController {
  async index(req: Request, res: Response) {
    const { deckId } = req.params;
    const userId = req.user.id;

    const currentDate = new Date().toISOString();

    const cards = await prisma.card.findMany({
      where: {
        userId,
        deckId: Number(deckId),
        next_review: {
          lte: currentDate,
        },
      },
    });

    return res.json(cards);
  }
}
