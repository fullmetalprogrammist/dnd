import { SourceTypes, SOURCE_TYPES } from "../types";
import { SourceSwitcher } from "./SourceSwitcher";
import { EntityAddButton } from "./EntityAddButton";
import { DropZone } from "@/src/frontend/DropZone";
import { LinesList } from "./lists/LinesList";
import { CharactersList } from "./lists/CharactersList";
import { ScenesList } from "./lists/ScenesList";
import { useDispatch, useSelector } from "react-redux";
import { 
  addCharacter, 
  addLine, 
  addScene, 
  setLeftMode, 
  setRightMode,
  importLines
} from "@/src/frontend/store/editor/slice";
import { InsertPosition } from "@/src/frontend/store/editor/types/InsertPosition";
import { RootState } from "@/src/frontend/store/editor";

type PanelSide = "left" | "right";

export type SourcePanelProps = {
  side: PanelSide;
}

export function SourcePanel({ side }: SourcePanelProps) {
  const mode = useSelector((state: RootState) => 
    side === "left" 
      ? state.editor.leftMode 
      : state.editor.rightMode
  );

  // dispatch вызывает пересчет всех колбэков из всех useSelector. если результат колбэка после пересчета отличается от предыдущего результата, редакс тригерит ререндер компонента, в котором использовался этот колбэк.
  // переиспользовать mode из строки выше нельзя, базовое правило - колбэк в useSelector должен опираться только на store-значения. иначе, если использовать mode из пред строки, то его значение замкнется и пересчет будет кривой, ненадежный.
  const showDropZone = useSelector((state: RootState) => {
    const mode = side === "left" 
      ? state.editor.leftMode 
      : state.editor.rightMode;

    if (mode !== "lines")
      return false;

    return (state.editor.data?.lines.length ?? 0) === 0;
  })

  const dispatch = useDispatch();

  const importLinesFromFile = (file: File) => {
    file.text().then(t => dispatch(
      importLines(t
        .split("\n")
        .map(t => t.trim())
        .filter(Boolean)
      )
    ));
  }

  const addEntity = (() => {
    switch (mode) {
      case "lines":
        return (pos: InsertPosition) => dispatch(addLine(pos));
      case "characters":
        return (pos: InsertPosition) => dispatch(addCharacter(pos));
      case "scenes":
        return (pos: InsertPosition) => dispatch(addScene(pos));
      default:
        return () => {};  // TODO: мб throw?
    }
  })();

  const selectMode = 
    side === "left"
      ? (mode: SourceTypes) => dispatch(setLeftMode(mode))
      : (mode: SourceTypes) => dispatch(setRightMode(mode));

  return (
    <div className="flex flex-col h-full">
      <SourceSwitcher
        currentMode={mode}
        allModes={SOURCE_TYPES}
        onChange={selectMode}
      />
      <EntityAddButton addEntity={() => addEntity("start")} />
      <div className="flex-1 overflow-auto">
        { showDropZone 
          ? <DropZone action={importLinesFromFile} /> 
          : <div className="flex flex-col gap-1 p-1">
              {mode === "lines" && <LinesList /> }
              {mode === "characters" && <CharactersList /> }
              {mode === "scenes" && <ScenesList /> }
            </div>
        }
      </div>
      <EntityAddButton addEntity={() => addEntity("end")} />
    </div>
  )
}