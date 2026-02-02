import { EditorData } from "../../features/editor/EditorData";
import { SourceTypes } from "../../features/editor/types";
import { EditorState } from "./EditorState";
import { PayloadAction } from "@reduxjs/toolkit";
import { InsertPosition } from "./types/InsertPosition";

export function initEditor(
  state: EditorState, 
  action: PayloadAction<EditorData>
) {
  state.data = action.payload;
  state.activeItem = null;
}

export function setActiveItem(
  state: EditorState,
  action: PayloadAction<{ itemType: SourceTypes; fid: string } | null>
) {
  state.activeItem = action.payload;
}

export function addCharacter(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertByPosition(
    state.data?.characters, 
    createNewCharacter(), 
    action.payload
  );
}

export function addLine(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertByPosition(
    state.data?.lines, 
    createNewLine(), 
    action.payload
  );
}

export function addScene(
  state: EditorState, 
  action: PayloadAction<InsertPosition>
) {
  insertByPosition(
    state.data?.scenes, 
    createNewScene(), 
    action.payload
  );
}

export function setLeftMode(
  state: EditorState,
  action: PayloadAction<SourceTypes>
) {
  state.leftMode = action.payload;
}

export function setRightMode(
  state: EditorState,
  action: PayloadAction<SourceTypes>
) {
  state.rightMode = action.payload;
}

export function importLines(
  state: EditorState,
  action: PayloadAction<string[]>
) {
  if (state.data?.lines) 
    state.data.lines = [...action.payload.map(str => createNewLine(str))];
}

// Хелперы
function insertByPosition<T>(
  array: T[] | undefined,
  item: T,
  position: InsertPosition
) {
  if (!array) return;
  position === "end" ? array.push(item) : array.unshift(item);
}

function createNewLine(text?: string) {
  return {
    fid: crypto.randomUUID(),
    bid: null,
    text: text ?? null,
    characterFid: null,
    inProjectOrder: 2,
    inSceneOrder: null,
    sceneFid: null
  }
}

function createNewScene() {
  return {
    fid: crypto.randomUUID(),
    bid: null,
    pictureUrl: null
  }
}

function createNewCharacter() {
  return {
    bid: null,
    fid: crypto.randomUUID(),
    fullname: null,
    shortname: null,
    portraitUrl: null
  }
}