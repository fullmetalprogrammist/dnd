"use client";

import { useState } from "react";
import {
  ProjectEditDto,
  ProjectEditProjectInfo,
  ProjectEditLineDto,
  ProjectEditCharacterDto,
  ProjectEditSceneDto,
} from "@/src/backend/application/query/project/getProjectForEdit/ProjectEditDto";
import { SourceTypes } from "./types";
import { SourcePanel } from "./source-panel/SourcePanel";
import { SourcePanelProps } from "./source-panel/SourcePanel";
import { EditorPanel } from "./editor-panel/EditorPanel";

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