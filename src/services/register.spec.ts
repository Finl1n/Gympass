import { test, describe, it, expect } from "vitest";
import { RegisterUseCase } from "./register.js";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository.js";
import { compare } from "bcryptjs";

describe("register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const prismaUserRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUserRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });
});
