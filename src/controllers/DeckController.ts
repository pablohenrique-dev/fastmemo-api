import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../utils/AppError";

export class DeckController {
  async index(req: Request, res: Response) {
    const { id: userId } = req.user;

    const decks = await prisma.deck.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json(decks);
  }

  async show(req: Request, res: Response) {
    const { deckId } = req.params;
    const { id: userId } = req.user;

    const deck = await prisma.deck.findUnique({
      where: {
        id: Number(deckId),
        userId,
      },
      include: {
        cards: true,
      },
    });

    if (!deck) {
      throw new AppError("Deck não encontrado!", 404);
    }

    return res.status(200).json(deck);
  }

  async create(req: Request, res: Response) {
    const { name }: { name: string } = req.body;
    const { id: userId } = req.user;

    const deckAlreadyExists = await prisma.deck.findFirst({
      where: {
        name: name.trim(),
        userId,
      },
    });

    if (deckAlreadyExists) {
      throw new AppError("Um deck com o mesmo nome já existe!");
    }

    await prisma.deck.create({
      data: {
        name,
        userId,
      },
    });

    return res.status(201).json();
  }

  async update(req: Request, res: Response) {
    const { name }: { name: string } = req.body;
    const { deckId } = req.params;
    const { id: userId } = req.user;

    const deck = await prisma.deck.findUnique({
      where: {
        id: Number(deckId),
        userId,
      },
    });

    if (!deck) {
      throw new AppError("Deck não encontrado!");
    }

    const deckWithThatNameAlreadyExists = await prisma.deck.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (deckWithThatNameAlreadyExists) {
      throw new AppError("Um outro deck já possui este nome!");
    }

    await prisma.deck.update({
      where: {
        id: Number(deckId),
        userId,
      },
      data: {
        name: name.trim(),
      },
    });

    return res.status(201).json();
  }

  async delete(req: Request, res: Response) {
    const { deckId } = req.params;
    const { id: userId } = req.user;

    const deck = await prisma.deck.findUnique({
      where: {
        id: Number(deckId),
        userId,
      },
    });

    if (!deck) {
      throw new AppError("Deck não encontrado!", 404);
    }

    await prisma.card.deleteMany({
      where: {
        userId,
        deckId: Number(deckId)
      }
    })

    await prisma.deck.delete({
      where: {
        id: Number(deckId),
        userId,
      },
    });

    return res.status(204).json();
  }
}
