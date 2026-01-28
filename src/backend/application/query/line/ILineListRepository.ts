import { ProjectId } from "@/src/backend/core/entity/Project";
import { LineListItemDto } from "@/src/backend/application/query/line/LineListItemDto";

export interface ILineListRepository {
  getLinesByProjectId(projectId: ProjectId): Promise<LineListItemDto[]>;
}