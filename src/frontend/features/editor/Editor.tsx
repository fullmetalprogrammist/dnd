"use client";

import { useState } from "react";
import {
  EditorData,
  EditorDataProject,
  EditorDataLine,
  EditorDataCharacter,
  EditorDataScene
} from "@/src/frontend/features/editor/types/EditorData";
import { ENTITIES, EntityTypes } from "./entity-panel/types/EntityTypes";
import { EntityPanel } from "./entity-panel/EntityPanel";
import { Workbench } from "./workbench/Workbench";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editorActions } from "@/src/frontend/store/editor";

type EditorProps = {
  data: EditorData;
}

export type EditorContextValue = {
  lines: EditorDataLine[];
  importLinesFromText: (text: string) => void;
  addCharacter: () => void;
  addScene: () => void;
  addLine: () => void;
  selectItem: (mode: EntityTypes, fid: string) => void;
};

export type ActiveItem = {
  mode: EntityTypes;
  entity: EditorDataLine | EditorDataCharacter | EditorDataScene;
}

export function Editor({ data }: EditorProps) {
  const [leftMode, setLeftMode] = useState<EntityTypes>("lines");
  const [rightMode, setRightMode] = useState<EntityTypes>("characters");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editorActions.initEditor(data));
  }, [data, dispatch]);

  return (
    <div className="flex flex-row h-full w-full">
      <div className="w-1/4 bg-amber-100">
        <EntityPanel mode={leftMode} setMode={setLeftMode} />
      </div>
      <div className="w-1/2 bg-green-200">
        <Workbench />
      </div>
      <div className="w-1/4 bg-amber-100">
        <EntityPanel mode={rightMode} setMode={setRightMode} />
      </div>
    </div>
  )
}