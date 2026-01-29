import { EditorStateLine } from "@/src/backend/application/query/project/getProjectForEdit/EditorState"

export function LinesList({ lines }: { lines: EditorStateLine[]}) {
  return (
    <div className="flex flex-col gap-1 p-1">
      {lines.map(line => 
        <div key={line.fid} className="outline p-1">
          {line.text}
        </div>
      )}
    </div>
  )
}