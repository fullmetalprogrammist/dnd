import { EntityTypes, ENTITIES } from "./types/EntityTypes";
import { EntityTypeSwitcher } from "./EntityTypeSwitcher";
import { AddEntityButton } from "./AddEntityButton";
import { LinesList } from "./lists/LinesList";
import { CharactersList } from "./lists/CharactersList";
import { ScenesList } from "./lists/ScenesList";
import { useDispatch, useSelector } from "react-redux";
import { editorActions } from "@/src/frontend/store/editor";
import { InsertPosition } from "@/src/frontend/store/editor/reducers/helpers/insertByPosition";
import { RootState } from "@/src/frontend/store";
import { LinesImportDropZone } from "@/src/frontend/common/ui/drop-zone/LinesImportDropZone";

export type SourcePanelProps = {
  mode: EntityTypes,
  setMode: (mode: EntityTypes) => void;
}

export function EntityPanel({ mode, setMode }: SourcePanelProps) {
  // dispatch вызывает пересчет всех колбэков из всех useSelector. если результат колбэка после пересчета отличается от предыдущего результата, редакс тригерит ререндер компонента, в котором использовался этот колбэк.
  // переиспользовать mode из строки выше нельзя, базовое правило - колбэк в useSelector должен опираться только на store-значения. иначе, если использовать mode из пред строки, то его значение замкнется и пересчет будет кривой, ненадежный.
  const showDropZone = useSelector((state: RootState) => {
    if (mode !== "lines")
      return false;

    return (state.editor.data?.lines.length ?? 0) === 0;
  })

  const dispatch = useDispatch();

  const addEntity = (() => {
    switch (mode) {
      case "lines":
        return (pos: InsertPosition) => dispatch(editorActions.addLine(pos));
      case "characters":
        return (pos: InsertPosition) => dispatch(editorActions.addCharacter(pos));
      case "scenes":
        return (pos: InsertPosition) => dispatch(editorActions.addScene(pos));
      default:
        return () => {};  // TODO: мб throw?
    }
  })();

  return (
    <div className="flex flex-col h-full">
      <EntityTypeSwitcher
        currentMode={mode}
        allModes={ENTITIES}
        onChange={setMode}
      />
      <AddEntityButton addEntity={() => addEntity("start")} />
      <div className="flex-1 overflow-auto">
        { showDropZone 
          ? <LinesImportDropZone />
          : <div className="flex flex-col gap-1 p-1">
              {mode === "lines" && <LinesList /> }
              {mode === "characters" && <CharactersList /> }
              {mode === "scenes" && <ScenesList /> }
            </div>
        }
      </div>
      <AddEntityButton addEntity={() => addEntity("end")} />
    </div>
  )
}