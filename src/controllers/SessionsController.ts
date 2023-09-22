import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../utils/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "../config/auth";

export class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new AppError("Email e/ou senha incorretos!", 404);
    }

    const validPassword = await compare(password, userExists.password);

    if (!validPassword) {
      throw new AppError("Email e/ou senha incorretos!", 404);
    }

    const { secret, expiresIn } = authConfig.jwt;

    if (secret) {
      const token = sign({}, secret!, {
        subject: String(userExists.id),
        expiresIn,
      });

      const { password, ...user } = userExists;
      return res.json({ user, token });
    }
  }
}
