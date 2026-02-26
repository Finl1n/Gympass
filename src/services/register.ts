import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma.js";
import type { FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import type { UsersRepository } from "@/repositories/users-repository.js";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error.js";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByeEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
