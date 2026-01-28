import { Prisma } from '@/src/backend/generated/prisma/client';
import { NotExistEntityError } from "@/src/backend/core/errors/NotExistEntityError";
import { InvalidReferenceError } from "@/src/backend/core/errors/InvalidReferenceError";
import { DuplicateEntityError } from "@/src/backend/core/errors/DuplicateEntityError";

export class PrismaErrorMapper {
  map(error: unknown): never | void {
    if(!(error instanceof Prisma.PrismaClientKnownRequestError)) return;

    switch (error.code) {
      case "P2002":
        throw new DuplicateEntityError("Duplicate entity", { cause: error });
      case "P2025":
        throw new NotExistEntityError("Entity not found", { cause: error });
      case "P2003":
        throw new InvalidReferenceError("Invalid reference", { cause: error });
    }
  }
}