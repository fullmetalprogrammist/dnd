import { Scene } from "@/src/backend/context/viewer-room/entity/Scene";

export interface ISceneRepository {
  getAllScenes(projectCode: string): Promise<Scene[]>;
}