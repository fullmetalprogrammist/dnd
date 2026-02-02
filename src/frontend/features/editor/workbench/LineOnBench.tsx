import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";


export function LineOnBench() {
  const activeLine = useSelector((state: RootState) => {
    return state.editor.data?.lines.find(line => line.fid === state.editor.activeItem?.fid)
  });

  return <div>{activeLine?.text}</div>
}