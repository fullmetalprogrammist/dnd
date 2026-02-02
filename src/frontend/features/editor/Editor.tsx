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
import { Workbench } from "./workbench/Workbench";
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

  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/4 bg-amber-100">
        <SourcePanel side="left" />
      </div>
      <div className="w-1/2 bg-green-200">
        <Workbench />
      </div>
      <div className="w-1/4 bg-amber-100">
        <SourcePanel side="right" />
      </div>
    </div>
  )
}