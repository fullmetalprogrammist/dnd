import { useSelector } from "react-redux";
import { RootState } from "@/src/frontend/store/editor";
import { LineOnBench } from "./LineOnBench";
import { CharacterOnBench } from "./CharacterOnBench";
import { SceneOnBench } from "./SceneOnBench";

const itemsOnBench = {
  lines: LineOnBench,
  characters: CharacterOnBench,
  scenes: SceneOnBench
}

export function Workbench() {
  // селектор должен возвращать данные. не надо возвращать jsx, это некорректно.
  const item = useSelector(
    (state: RootState) => state.editor.activeItem
  );

  if (!item)
    return null;

  const Component = itemsOnBench[item.itemType];

  return (
    <div className="flex flex-col h-full">
      <div>Тут меню проекта (сохранить, изменить титл и т.д.)</div>
      <div className="flex-1 flex items-center justify-center">
        <Component key={item.fid} />
      </div>
    </div>
  )
}