import { dataSourceConfig } from "@/src/backend/config/dataSourceConfig";
import { MinioStorageService } from "@/src/backend/service/PictureStorageService/MinioStorageService";
import { ISceneRepository } from "./ISceneRepository";
import { JsonSceneRepository } from "./json/JsonSceneRepository";

const storageService = new MinioStorageService("movies");

function createSceneRepository(): ISceneRepository {
  if (dataSourceConfig.dataSourceType === "json") {
    return new JsonSceneRepository(dataSourceConfig, storageService);
  } else if (dataSourceConfig.dataSourceType === "postgres") {
    throw new Error("Репозиторий для СУБД Postgres еще не реализован");
  }

  throw new Error("Не удалось создать репозиторий сцен. Неизвестный источник данных: " + dataSourceConfig.dataSourceType);
}

export const sceneRepository = createSceneRepository();