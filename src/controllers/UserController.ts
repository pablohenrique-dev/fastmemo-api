import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../utils/AppError";
import { compare, hash } from "bcryptjs";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists) {
      throw new AppError("Este e-mail já está sendo utilizado");
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json();
  }

  async update(req: Request, res: Response) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailAlreadyExists && user.id !== id) {
      throw new AppError("Este e-mail já está sendo utilizado");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "É necessário informar a senha antiga para definir a nova senha!"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não é compatível!");
      }
      user.password = await hash(password, 8);
    }

    const { updated_at, ...updatedUser } = user;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updatedUser,
      },
    });

    return res.status(201).json();
  }
}
