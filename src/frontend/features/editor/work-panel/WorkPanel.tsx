import { ActiveItem } from "../Editor";
import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";

type WorkPanelProps = {
  item: ActiveItem | null;
}

export function WorkPanel({ item }: WorkPanelProps) {
  const lines = useSelector(
    (state: RootState) => state.editor.data?.lines
  );

  return lines?.map(line => <div key={line.fid}>{line.text}</div>);
}