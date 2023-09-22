import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
      };
    }
  }
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authTokenHeader = req.headers.authorization;

  if (!authTokenHeader) {
    throw new AppError("Token JWT não informado", 401);
  }

  const [_, token] = authTokenHeader.split(" ");

  try {
    const { sub: userId } = verify(token, authConfig.jwt.secret!);

    req.user = {
      id: Number(userId),
    };

    return next();
  } catch (error) {
    throw new AppError("JWT inválido", 401);
  }
}
