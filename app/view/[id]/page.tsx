import { Screenplay } from "@/src/components/Screenplay";
import { sceneRepository } from "@/src/backend/repository/sceneRepository";

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
