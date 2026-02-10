import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { editorThunks } from "@/src/frontend/store/editor";
import { useAppDispatch } from "@/src/frontend/store";

export function LinesList() {
  const lines = useSelector(
    (state: RootState) => state.editor.data?.lines
  );

  const dispatch = useAppDispatch();
  const selectLine = (fid: string) => dispatch(
    editorThunks.changeActiveItem({
      itemType: "lines",
      fid
    })
  );

  return lines?.map(line => 
    <div 
      key={line.fid} 
      onClick={() => selectLine(line.fid)}
      className="outline p-1"
    >
      {line.text}
    </div>
  )
}