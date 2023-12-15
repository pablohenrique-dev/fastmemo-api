import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { formatDateToday, shiftDayOfADate } from "../utils/handleDate";

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
          lt: shiftDayOfADate(formatDateToday(), 1),
          gte: formatDateToday(),
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
        userId,
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
    const { initialDate, finalDate } = req.query;
    const userId = req.user.id;

    const initialDateQueryParam =
      initialDate && typeof initialDate === "string"
        ? new Date(initialDate)
        : shiftDayOfADate(new Date(), -30);
    const finalDateQueryParam =
      finalDate && typeof finalDate === "string"
        ? shiftDayOfADate(finalDate, 1)
        : new Date();

    const allReviews = await prisma.cardReviewCount.findMany({
      where: {
        userId,
        created_at: {
          lte: finalDateQueryParam,
          gte: initialDateQueryParam,
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });

    return res.status(200).json(allReviews);
  }
}
