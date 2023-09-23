import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { prisma } from "../prisma/client";
import { AppError } from "../utils/AppError";

export class ValidateTokenController {
  async create(req: Request, res: Response) {
    const { token } = req.body;

    try {
      const { sub: userId } = verify(token, authConfig.jwt.secret!);

      if (userId) {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(userId),
          },
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            created_at: true,
            updated_at: true,
          },
        });

        return res.json(user);
      }
    } catch (error) {
      throw new AppError("JWT inválido", 401);
    }
  }
}
