import {
  EditorStateLine,
  EditorStateCharacter,
  EditorStateScene
} from "@/src/backend/application/query/project/getProjectForEdit/EditorState";
import { SourceTypes, SOURCE_TYPES } from "../types";
import { SourceSwitcher } from "./SourceSwitcher";
import { renderContent } from "./renderContent";
import { EntityAddButton } from "./EntityAddButton";
import { DropZone } from "@/src/frontend/DropZone";

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

  return (
    <div className="flex flex-col h-full">
      <SourceSwitcher
        currentMode={props.mode}
        allModes={SOURCE_TYPES}
        onChange={props.onModeChange}
      />
      <EntityAddButton />
      <div className="flex-1 overflow-auto">
        { showDropZone 
          ? <DropZone /> 
          : renderContent(props) 
        }
      </div>
      <EntityAddButton />
    </div>
  )
}