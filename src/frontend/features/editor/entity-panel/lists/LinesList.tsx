import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store";
import { editorActions } from "@/src/frontend/store/editor";

export function LinesList() {
  const lines = useSelector(
    (state: RootState) => state.editor.data?.lines
  );

  const dispatch = useDispatch();
  const selectLine = (fid: string) => dispatch(
    editorActions.setActiveItem({
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