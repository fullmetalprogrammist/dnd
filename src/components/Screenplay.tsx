import { SceneView } from "./SceneView";
import type { Scene } from "@/src/backend/context/viewer-room/entity/Scene";

type ScreenplayProps = {
  scenes: Scene[];
}

export function Screenplay({ scenes = [] }: ScreenplayProps) {
  return (
    <div className="flex flex-col items-center gap-10 my-0 mx-auto bg-stone-300">
      { scenes.map(scene => <SceneView key={scene.id} url={scene.pictureUrl} lines={scene.lines} />) }
    </div>
  )
}

// потом переделать тут на мапу поиск линий и сравнить скорость