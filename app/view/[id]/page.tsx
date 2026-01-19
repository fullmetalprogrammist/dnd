import { Screenplay } from "@/src/components/Screenplay";
import { MinioPictureStorageService } from "@/src/backend/MinioPictureStorageService";
import { JsonSceneRepository } from "@/src/backend/context/viewer-room/repository/json/JsonSceneRepository";
import { IJsonDataSourceConfig } from "@/src/backend/config/IJsonDataSourceConfig";
import { dataSourceConfig } from "@/src/backend/config/dataSourceConfig";
import { sceneRepository } from "@/src/backend/context/viewer-room/repository/sceneRepository";

interface ViewerRoomProps {
  params: Promise<{
    id: string
  }>;
}

export default async function ViewerRoom({ params }: ViewerRoomProps) {
  const { id: projectCode } = await params;
  
  const scenes = await sceneRepository.getAllScenes(projectCode);

  return (
    <div>
      <Screenplay scenes={scenes} />
    </div>
  );
}
