import { Line } from "@/src/backend/generated/prisma/client";
import type { LineDTO } from "@/src/backend/dto/domain/LineDTO";

export interface ILineRepository {
  create(line: LineDTO): Promise<Line>;
  getByProjectId(projectId: number): Promise<Line[]>;
}