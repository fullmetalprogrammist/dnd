import { getScenes } from "@/src/components/getScenes";
import { SceneList } from "@/src/components/SceneList";

export default async function Home() {
  const scenes = await getScenes();

  return (
    <div>
      <SceneList scenes={scenes} />
    </div>
  );
}
