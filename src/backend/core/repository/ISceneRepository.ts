import { Scene } from "@/src/backend/core/entity/Scene";

export interface ISceneRepository {
  getAllScenes(projectCode: string): Promise<Scene[]>;
}