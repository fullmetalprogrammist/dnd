import { ProjectId } from "@/src/backend/core/entity/Project";
import { ILineListRepository } from "@/src/backend/application/query/line/ILineListRepository";
import { LineListItemDto } from "@/src/backend/application/query/line/LineListItemDto";

export class GetLinesByProjectId {

  constructor(private readonly lineListRepo: ILineListRepository) { }

  async execute(projectId: ProjectId): Promise<LineListItemDto[]> {
    const lines = await this.lineListRepo.getLinesByProjectId(projectId);
    return lines.sort((a, b) => a.inProjectOrder - b.inProjectOrder);
  }

}