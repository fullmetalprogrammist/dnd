import { Screenplay } from "@/src/components/Screenplay";
import { MinioPictureStorageService } from "@/src/backend/MinioPictureStorageService";
import { JsonSceneRepository } from "@/src/backend/context/viewer-room/repository/json/JsonSceneRepository";
import { IJsonDataSourceConfig } from "@/src/config/IJsonDataSourceConfig";

interface ViewerRoomProps {
  params: Promise<{
    id: string
  }>;
}

export default async function ViewerRoom({ params }: ViewerRoomProps) {
  const { id: projectCode } = await params;
  const service = new MinioPictureStorageService("movies");
  
  const dataSourceConfig: IJsonDataSourceConfig = {
    dataFilePath: "text.json",
    baseUrl: "http://localhost:3000",
    picturesPath: {
      scenes: "scenes",
      characters: "characters"
    }
  }

  const sceneRepo = new JsonSceneRepository(dataSourceConfig, service);
  const scenes = await sceneRepo.getAllScenes(projectCode);

  return (
    <div>
      <Screenplay scenes={scenes} />
    </div>
  );
}
