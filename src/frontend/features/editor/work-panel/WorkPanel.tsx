import { ActiveItem } from "../Editor"

type WorkPanelProps = {
  item: ActiveItem | null;
}

export function WorkPanel({ item }: WorkPanelProps) {
  return <div>{item?.entity.fid}</div>
}