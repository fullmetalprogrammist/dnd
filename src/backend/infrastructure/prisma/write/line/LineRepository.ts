import { ILineRepository } from "@/src/backend/application/interface/write/line/ILineRepository";
import { Line as LineORM } from "@/src/backend/generated/prisma/client";
import { prisma } from "@/src/backend/infrastructure/prisma/prismaClient";
import { Line, LineId } from "@/src/backend/core/entity/Line";
import { Prisma } from '@/src/backend/generated/prisma/client';
import { NotExistEntityError } from "@/src/backend/core/errors/NotExistEntityError";
import { InvalidReferenceError } from "@/src/backend/core/errors/InvalidReferenceError";

export class LineRepository implements ILineRepository {

  // TODO: написать интеграционные тесты
  async save(line: Line): Promise<LineId> {
    try {
      const ln = line.id
        ? await this.update(line)
        : await this.create(line);
  
      return ln.id;
    } catch (error) {
      this.handlePrismaError(error);
      throw error;
    }
  }

  async getById(lineId: LineId): Promise<Line> {
    try {
      const line = await prisma.line.findUniqueOrThrow({
        where: {
          id: lineId
        }
      })

      return this.mapToDomain(line);
    } catch (error) {
      this.handlePrismaError(error);
      throw error;
    }
  }

  private update(line: Line): Promise<LineORM> {
    return prisma.line.update({
      where: { id: line.id },
      data: {
        inProjectOrder: line.inProjectOrder,
        characterId: line.character,
        lineText: line.text,
        // ln.inSceneOrder - не обязаны тут это заполнять, это несовпадение структуры домена и структуры хранения - норма
      }
    })
  }

  private create(line: Line): Promise<LineORM> {
    return prisma.line.create({
      data: {
        lineText: line.text,
        characterId: line.character,
        projectId: line.project,
        inProjectOrder: line.inProjectOrder
      }
    });
  }

  private mapToDomain(line: LineORM) {
    return {
      id: line.id,
      text: line.lineText,
      project: line.projectId,
      inProjectOrder: line.inProjectOrder,
      character: line.characterId
    }
  }

  private handlePrismaError(error: unknown): void {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
      return;
    }

    switch (error.code) {
      case "P2025":
        throw new NotExistEntityError("Line not found");
      case "P2003":
        throw new InvalidReferenceError(
          "Invalid foreign key (character or project does not exist)"
        );
    }
  }

}