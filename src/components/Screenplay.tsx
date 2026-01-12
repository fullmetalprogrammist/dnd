import { Scene } from "./Scene";

type ScreenplayProps = {
  scenes: any[];
  lines: any[];
}

export function Screenplay({ scenes = [], lines = [] }: ScreenplayProps) {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://indamovie.vercel.app/" 
    : "http://localhost:3000";

  return (
    <div className="flex flex-col items-center gap-10 my-0 mx-auto bg-stone-300">
      {scenes.map(scene => {
        const url = `${baseUrl}/dnd/pic/${scene.pic}`;
        const sceneLines = lines.filter(line => scene.lines.includes(line.id));
        return <Scene key={scene.id} url={url} lines={sceneLines} />
      })}
    </div>
  )
}

// потом переделать тут на мапу поиск линий и сравнить скорость