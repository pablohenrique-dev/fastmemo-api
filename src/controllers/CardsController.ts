import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../utils/AppError";

export class CardsController {
  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const { front, back, next_review, deckId } = req.body;

    await prisma.card.create({
      data: {
        front,
        back,
        next_review,
        deckId: Number(deckId),
        userId,
      },
    });

    return res.status(201).json();
  }

  async update(req: Request, res: Response) {
    const { front, back } = req.body;
    const { cardId } = req.params;
    const userId = req.user.id;

    const card = await prisma.card.findUnique({
      where: {
        id: Number(cardId),
        userId,
      },
    });

    if (!card) {
      throw new AppError("Card não encontrado!", 404);
    }

    await prisma.card.update({
      where: {
        userId,
        id: Number(cardId),
      },
      data: {
        front,
        back,
      },
    });

    return res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const { deckId } = req.params;
    const { search } = req.query;

    const userId = req.user.id;

    const cards = await prisma.card.findMany({
      where: {
        deckId: Number(deckId),
        userId,
        front: {
          contains: search && typeof search === "string" ? search : "",
        }
      },
    });

    return res.json(cards);
  }

  async show(req: Request, res: Response) {
    const { deckId, cardId } = req.params;
    const userId = req.user.id;

    const card = await prisma.card.findUnique({
      where: {
        id: Number(cardId),
        deckId: Number(deckId),
        userId,
      },
    });

    if (!card) {
      throw new AppError("Card não encontrado!", 404);
    }

    return res.json(card);
  }

  async delete(req: Request, res: Response) {
    const { cardId } = req.params;
    const userId = req.user.id;

    const card = await prisma.card.findUnique({
      where: {
        id: Number(cardId),
        userId,
      },
    });

    if (!card) {
      throw new AppError("Card não encontrado!", 404);
    }

    await prisma.card.delete({
      where: {
        id: Number(cardId),
        userId,
      },
    });

    return res.status(204).json();
  }
}
