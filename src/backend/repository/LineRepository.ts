import { LineDTO } from "@/src/backend/dto/domain/LineDTO";
import { ILineRepository } from "./ILineRepository";
import { Line } from "@/src/backend/generated/prisma/client";
import { prisma } from "@/src/backend/factory/prismaClient";

export class LineRepository implements ILineRepository {
  create(line: LineDTO): Promise<Line> {
    throw new Error("not implemented yet");
  }

  async getByProjectId(projectId: number): Promise<Line[]> {
    try {
      const lines: Line[] = await prisma.line.findMany({
        where: {
          projectId: projectId
        }
      })

      return lines;
    } catch (error) {
      throw error;
    }
  }
}