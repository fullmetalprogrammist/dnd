import {
  ProjectEditLineDto,
  ProjectEditCharacterDto,
  ProjectEditSceneDto,
} from "@/src/backend/application/query/project/getProjectForEdit/ProjectEditDto";
import { SourceTypes, SOURCE_TYPES } from "../types";
import { SourceSwitcher } from "./SourceSwitcher";
import { renderContent } from "./renderContent";

export type SourcePanelProps =
  | {
      mode: "lines";
      items: ProjectEditLineDto[];
      onModeChange: (mode: SourceTypes) => void;
    }
  | {
      mode: "characters";
      items: ProjectEditCharacterDto[];
      onModeChange: (mode: SourceTypes) => void;
    }
  | {
      mode: "scenes";
      items: ProjectEditSceneDto[];
      onModeChange: (mode: SourceTypes) => void;
    };

export function SourcePanel(props: SourcePanelProps) {
  return (
    <div className="flex flex-col h-full">
      <SourceSwitcher
        currentMode={props.mode}
        allModes={SOURCE_TYPES}
        onChange={props.onModeChange}
      />
      {/* <EntityAddButton /> */}
      <div className="flex-1 overflow-auto">
        {renderContent(props)}
      </div>
      {/* <EntityAddButton /> */}
    </div>
  )
}