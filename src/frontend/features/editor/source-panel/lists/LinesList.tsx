import { EditorStateLine } from "@/src/backend/application/query/project/getProjectForEdit/EditorState"

export function LinesList({ lines }: { lines: EditorStateLine[]}) {
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