import { Screenplay } from "@/src/frontend/components/Screenplay";
import { sceneRepository } from "@/src/backend/factory/sceneRepositoryFactory";

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
