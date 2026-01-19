import type { Line } from "@/src/backend/context/viewer-room/entity/Line";

type SceneViewProps = {
  url: string;
  lines: Line[];
}

export function SceneView({ url, lines }: SceneViewProps) {
  // console.log(lines);
  return (
    <div className="border-1 border-solid border-gray-600 rounded-md p-2 w-lg bg-neutral-50">
      <img className="w-full mb-3" src={url} />
      <div className="flex flex-col gap-3">
        { lines.map(line => <div className="flex gap-3 items-top" key={line.id}>{ 
            line.character
              ? line.character.portrait
                ? <img className="w-15 h-15" src={line.character.portrait} />
                : `${line.character.short}: ` 
              : "-" } 
            { <div className="flex items-center">{line.text}</div> }
          </div>) 
        }
      </div>
    </div>
  )
}