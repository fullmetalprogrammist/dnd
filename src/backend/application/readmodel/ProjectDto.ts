import { ProjectId } from "@/src/backend/core/entity/Project"
import { LineListItemDto } from "./LineListItemDto";

export type ProjectDto = {
  projectId: ProjectId;
  projectCode: string;
  projectTitle: string;
  lines: LineListItemDto[];
}