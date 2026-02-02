import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { setActiveItem } from "@/src/frontend/store/editor/slice";

export function LinesList() {
  const lines = useSelector(
    (state: RootState) => state.editor.data?.lines
  );

  const dispatch = useDispatch();
  const selectLine = (fid: string) => dispatch(
    setActiveItem({
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