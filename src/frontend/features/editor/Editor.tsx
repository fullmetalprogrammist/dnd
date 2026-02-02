"use client";

import { useState } from "react";
import {
  EditorData,
  EditorDataProject,
  EditorDataLine,
  EditorDataCharacter,
  EditorDataScene
} from "@/src/frontend/features/editor/EditorData";
import { SOURCE_TYPES, SourceTypes } from "./types";
import { SourcePanel } from "./source-panel/SourcePanel";
import { SourcePanelProps } from "./source-panel/SourcePanel";
import { WorkPanel } from "./work-panel/WorkPanel";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initEditor } from "@/src/frontend/store/editor/slice";

type EditorProps = {
  data: EditorData;
}

export type EditorContextValue = {
  lines: EditorDataLine[];
  importLinesFromText: (text: string) => void;
  addCharacter: () => void;
  addScene: () => void;
  addLine: () => void;
  selectItem: (mode: SourceTypes, fid: string) => void;
};

export type ActiveItem = {
  mode: SourceTypes;
  entity: EditorDataLine | EditorDataCharacter | EditorDataScene;
}

export function Editor({ data }: EditorProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initEditor(data));
  }, [data, dispatch]);

  const [leftMode, setLeftMode] = useState<SourceTypes>("lines");
  const [rightMode, setRightMode] = useState<SourceTypes>("characters");
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);

  // const importLinesFromText = (text: string) => {
  //   const parsed = text
  //     .split("\n")
  //     .map(t => t.trim())
  //     .filter(Boolean)
  //     .map((text, index) => ({
  //       bid: null,
  //       fid: crypto.randomUUID(),
  //       text,
  //       inProjectOrder: index,
  //       characterFid: null,
  //       sceneFid: null,
  //       inSceneOrder: null
  //     }));

  //   setLines(parsed);
  // }

  // const selectItem = (mode: SourceTypes, fid: string) => {
  //   const entity = (() => {
  //     switch (mode) {
  //       case "lines": return lines.find(line => line.fid === fid);
  //       case "characters": return characters.find(char => char.fid === fid);
  //       case "scenes": return characters.find(scene => scene.fid === fid);
  //     }
  //   })();

  //   if (!entity) return;

  //   setActiveItem({
  //     mode,
  //     entity
  //   })
  // }

  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/4 bg-amber-100">
        <SourcePanel side="left" />
      </div>
      <div className="w-1/2 bg-green-200">
        <WorkPanel item={activeItem} />
      </div>
      <div className="w-1/4 bg-amber-100">
        <SourcePanel side="right" />
      </div>
    </div>
  )
}