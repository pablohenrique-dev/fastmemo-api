import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { formatDateToday } from "../utils/handleDate";

export class ReviewCardCounterController {
  async update(req: Request, res: Response) {
    const { cardId } = req.params;
    const { next_review } = req.body;
    const userId = req.user.id;

    await prisma.card.update({
      where: {
        id: Number(cardId),
        userId,
      },
      data: {
        next_review,
      },
    });

    const reviewCardCounter = await prisma.cardReviewCount.findFirst({
      where: {
        created_at: {
          lte: `${formatDateToday()}T23:59:59.999Z`,
          gte: `${formatDateToday()}T00:00:00.000Z`,
        },
        cardId: Number(cardId),
        userId: userId,
      },
    });

    if (!reviewCardCounter) {
      await prisma.cardReviewCount.create({
        data: {
          userId: Number(userId),
          cardId: Number(cardId),
          count: 1,
        },
      });

      return res.status(201).json();
    }

    await prisma.cardReviewCount.update({
      where: {
        id: reviewCardCounter.id,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });

    return res.status(201).json();
  }

  async index(req: Request, res: Response) {
    const userId = req.user.id;

    const allReviews = await prisma.cardReviewCount.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json(allReviews);
  }
}
