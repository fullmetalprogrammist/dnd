import { Scene } from "./Scene";

type SceneListProps = {
  scenes: any[];
}

export function SceneList({ scenes }: SceneListProps) {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://indamovie.vercel.app/" 
    : "http://localhost:3000";

  return (
    <div className="flex flex-col items-center gap-10 my-0 mx-auto bg-stone-300">
      {scenes.map(s => {
        const url = `${baseUrl}/dnd/img/${s.id}.jpg`;
        return <Scene key={s.id} url={url} text={s.text} />
      })}
    </div>
  )
}