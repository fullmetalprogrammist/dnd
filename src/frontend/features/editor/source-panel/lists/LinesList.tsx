import { EditorDataLine } from "@/src/frontend/features/editor/EditorData"

export function LinesList({ lines }: { lines: EditorDataLine[]}) {
  return lines.map(line => 
    <div 
      key={line.fid} 
      onClick={() => alert("Кликнули на элемент с fid " + line.fid)}
      className="outline p-1"
    >
      {line.text}
    </div>
  )
}