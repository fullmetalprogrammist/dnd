import { ProjectId } from "@/src/backend/core/entity/Project";
import { LineListItemDto } from "../../../readmodel/LineListItemDto";

export interface ILineListRepository {
  getLinesByProjectId(projectId: ProjectId): Promise<LineListItemDto[]>;
}