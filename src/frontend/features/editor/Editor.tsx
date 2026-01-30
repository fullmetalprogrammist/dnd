"use client";

import { useState } from "react";
import {
  EditorState,
  EditorStateProject,
  EditorStateLine,
  EditorStateCharacter,
  EditorStateScene
} from "@/src/backend/application/query/project/getProjectForEdit/EditorState";
import { SOURCE_TYPES, SourceTypes } from "./types";
import { SourcePanel } from "./source-panel/SourcePanel";
import { SourcePanelProps } from "./source-panel/SourcePanel";
import { WorkPanel } from "./work-panel/WorkPanel";
import { createContext, useContext } from "react";

type EditorProps = {
  projectInit: EditorState;
}

export type EditorContextValue = {
  lines: EditorStateLine[];
  importLinesFromText: (text: string) => void;
  addCharacter: () => void;
  addScene: () => void;
  addLine: () => void;
  selectItem: (mode: SourceTypes, fid: string) => void;
};

export type ActiveItem = {
  mode: SourceTypes;
  entity: EditorStateLine | EditorStateCharacter | EditorStateScene;
}

export const EditorContext = createContext<EditorContextValue | null>(null);

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) {
    throw new Error("useEditor must be used inside EditorProvider");
  }
  return ctx;
}

export function Editor({ projectInit }: EditorProps) {
  const [project, setProject] = useState<EditorStateProject>(projectInit.project);
  const [lines, setLines] = useState<EditorStateLine[]>(projectInit.lines);
  const [characters, setCharacters] = useState<EditorStateCharacter[]>(projectInit.characters);
  const [scenes, setScenes] = useState<EditorStateScene[]>(projectInit.scenes);
  const [leftMode, setLeftMode] = useState<SourceTypes>("lines");
  const [rightMode, setRightMode] = useState<SourceTypes>("characters");
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

  const importLinesFromText = (text: string) => {
    const parsed = text
      .split("\n")
      .map(t => t.trim())
      .filter(Boolean)
      .map((text, index) => ({
        bid: null,
        fid: crypto.randomUUID(),
        text,
        inProjectOrder: index,
        characterFid: null,
        sceneFid: null,
        inSceneOrder: null
      }));

    setLines(parsed);
  }

  const addCharacter = () => {
    setCharacters(chars => [
      ...chars, 
      {
        bid: null,
        fid: crypto.randomUUID(),
        fullname: null,
        shortname: null,
        portraitUrl: null
      }
    ]);
  }

  const addScene = () => {
    alert("Сцена добавлена");
  }

  const addLine = () => {
    alert("Реплика добавлена");
  }

  const selectItem = (mode: SourceTypes, fid: string) => {
    const entity = (() => {
      switch (mode) {
        case "lines": return lines.find(line => line.fid === fid);
        case "characters": return characters.find(char => char.fid === fid);
        case "scenes": return characters.find(scene => scene.fid === fid);
      }
    })();

    if (!entity) return;

    setActiveItem({
      mode,
      entity
    })
  }

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
    <EditorContext.Provider
      value={{
        lines,
        importLinesFromText,
        addCharacter,
        addScene,
        addLine,
        selectItem
      }}
    >
      <div className="flex flex-row h-full w-full">
        <div className="w-1/4 bg-amber-100">
          <SourcePanel  {...leftPanelProps} />
        </div>
        <div className="w-1/2 bg-green-200">
          <WorkPanel item={activeItem} />
        </div>
        <div className="w-1/4 bg-amber-100">
          <SourcePanel  {...rightPanelProps} />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

function getSourcePanelProps(
  mode: SourceTypes,
  data: {
    lines: EditorStateLine[];
    characters: EditorStateCharacter[];
    scenes: EditorStateScene[];
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