import {
  EditorStateLine,
  EditorStateCharacter,
  EditorStateScene
} from "@/src/backend/application/query/project/getProjectForEdit/EditorState";
import { SourceTypes, SOURCE_TYPES } from "../types";
import { SourceSwitcher } from "./SourceSwitcher";
import { EntityAddButton } from "./EntityAddButton";
import { DropZone } from "@/src/frontend/DropZone";
import { useEditor } from "../Editor";
import { LinesList } from "./lists/LinesList";
import { CharactersList } from "./lists/CharactersList";
import { ScenesList } from "./lists/ScenesList";

export type SourcePanelProps =
  | {
      mode: "lines";
      items: EditorStateLine[];
      onModeChange: (mode: SourceTypes) => void;
    }
  | {
      mode: "characters";
      items: EditorStateCharacter[];
      onModeChange: (mode: SourceTypes) => void;
    }
  | {
      mode: "scenes";
      items: EditorStateScene[];
      onModeChange: (mode: SourceTypes) => void;
    };

export function SourcePanel(props: SourcePanelProps) {
  const showDropZone = props.mode === "lines" && props.items.length === 0;
  const ctx = useEditor();

  const addEntity = (() => {
    switch (props.mode) {
      case "lines":
        return ctx.addLine;
      case "characters":
        return ctx.addCharacter;
      case "scenes":
        return ctx.addScene;
      default:
        return () => {};
    }
  })();

  return (
    <div className="flex flex-col h-full">
      <SourceSwitcher
        currentMode={props.mode}
        allModes={SOURCE_TYPES}
        onChange={props.onModeChange}
      />
      <EntityAddButton addEntity={addEntity} />
      <div className="flex-1 overflow-auto">
        { showDropZone 
          ? <DropZone /> 
          : <div className="flex flex-col gap-1 p-1">
            {props.mode === "lines" && <LinesList lines={props.items} /> }
            {props.mode === "characters" && <CharactersList characters={props.items} /> }
            {props.mode === "scenes" && <ScenesList scenes={props.items} /> }
            </div>
        }
      </div>
      {/* <EntityAddButton /> */}
    </div>
  )
}