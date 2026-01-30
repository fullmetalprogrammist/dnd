import { EditorDataLine } from "@/src/frontend/features/editor/EditorData"
import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";

// export function LinesList({ lines }: { lines: EditorDataLine[]}) {
export function LinesList() {
  const lines = useSelector(
    (state: RootState) => state.editor.data?.lines
  );

  return lines?.map(line => 
    <div 
      key={line.fid} 
      onClick={() => alert("Кликнули на элемент с fid " + line.fid)}
      className="outline p-1"
    >
      {line.text}
    </div>
  )
}