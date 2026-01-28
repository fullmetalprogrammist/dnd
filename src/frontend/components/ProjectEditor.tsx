"use client";

import { useState } from "react";
import {
  ProjectEditDto,
  ProjectEditProjectInfo,
  ProjectEditLineDto,
  ProjectEditCharacterDto,
  ProjectEditSceneDto,
} from "@/src/backend/application/query/project/getProjectForEdit/ProjectEditDto";

type EditProjectProps = {
  projectInit: ProjectEditDto;
}

export function ProjectEditor({ projectInit }: EditProjectProps) {
  const [project, setProject] = useState<ProjectEditProjectInfo>(projectInit.projectInfo);
  const [lines, setLines] = useState<ProjectEditLineDto[]>(projectInit.lines);
  const [characters, setCharacters] = useState<ProjectEditCharacterDto[]>(projectInit.characters);
  const [scenes, setScenes] = useState<ProjectEditSceneDto[]>(projectInit.scenes);
  const [leftMode, setLeftMode] = useState<SourceTypes>("lines");
  const [rightMode, setRightMode] = useState<SourceTypes>("characters");

  const leftPanelProps = getSourcePanelProps(
    leftMode,
    { lines, characters, scenes },
    setLeftMode
  );

  const rightPanelProps = getSourcePanelProps(
    rightMode,
    { lines, characters, scenes },
    setRightMode
  );

  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/4 bg-amber-100">
        <SourcePanel  {...leftPanelProps} />
      </div>
      <div className="w-1/2 bg-green-200">
        <EditorPanel />
      </div>
      <div className="w-1/4 bg-amber-100">
        <SourcePanel  {...rightPanelProps} />
      </div>
    </div>
  )
}

function getSourcePanelProps(
  mode: SourceTypes,
  data: {
    lines: ProjectEditLineDto[];
    characters: ProjectEditCharacterDto[];
    scenes: ProjectEditSceneDto[];
  },
  onModeChange: (mode: SourceTypes) => void
): SourcePanelProps {
  switch (mode) {
    case "lines":
      return { mode, items: data.lines, onModeChange };
    case "characters":
      return { mode, items: data.characters, onModeChange };
    case "scenes":
      return { mode, items: data.scenes, onModeChange };
  }
}


type SourcePanelProps =
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

const SOURCE_TYPES = ["lines", "characters", "scenes"] as const;
type SourceTypes = typeof SOURCE_TYPES[number];

function SourcePanel(props: SourcePanelProps) {
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

type SourceSwitcherProps = {
  currentMode: SourceTypes;
  allModes: readonly SourceTypes[];
  onChange: (mode: SourceTypes) => void;
};

function SourceSwitcher({currentMode, allModes, onChange}: SourceSwitcherProps) {
  return (
    <div className="flex gap-2 border-b p-2">
      {allModes.map(mode => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={
            mode === currentMode
              ? "font-bold underline"
              : "opacity-60"
          }
        >
          {mode}
        </button>
      ))}
    </div>
  );
}

function renderContent({ mode, items }: SourcePanelProps) {
  switch (mode) {
    case "lines":
      return <LinesList lines={items} />
    case "characters":
      return <CharactersList characters={items} />;
    case "scenes":
      return <ScenesList scenes={items} />;
  }
}

function LinesList({ lines }: { lines: ProjectEditLineDto[]}) {
  return lines.map(line => <div>{line.text}</div>)
}

function CharactersList({ characters }: { characters: ProjectEditCharacterDto[]}) {
  return <div>temp</div>
}

function ScenesList({ scenes }: { scenes: ProjectEditSceneDto[]}) {
  return <div>temp</div>
}

function EditorPanel() {
  return <div>editor</div>
}