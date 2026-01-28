import { LineListItemDto } from "@/src/backend/application/query/line/LineListItemDto";
import { ILineListRepository } from "@/src/backend/application/interface/read/line/ILineListRepository";
import { ProjectId } from "@/src/backend/core/entity/Project";
// import { prisma } from "../../prismaClient";
import { Line as LineORM } from "@/src/backend/generated/prisma/client";
import { PrismaClient } from "@prisma/client/extension";

export class LineListRepository implements ILineListRepository {
  
  constructor(private readonly prisma: PrismaClient) { }

  async getLinesByProjectId(projectId: ProjectId): Promise<LineListItemDto[]> {
    try {
      const lines: LineORM[] = await this.prisma.line.findMany({
        where: {
          projectId: projectId
        }
      })
      // TODO: обработать ошибки
      return lines.map(this.mapToDto);
    } catch (error) {
      throw error;
    }
  }

  private mapToDto(line: LineORM): LineListItemDto {
    return {
      id: line.id,
      text: line.lineText,
      inProjectOrder: line.inProjectOrder,
      character: line.characterId
    }
  }

}