import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "./EditorState";
import * as reducers from "./reducers";

const initialState: EditorState = {
  data: null,
  leftMode: "lines",
  rightMode: "characters",
  activeItem: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers
});

export const { 
  initEditor, 
  setActiveItem, 
  addCharacter,
  addLine,
  addScene,
  setLeftMode,
  setRightMode,
  importLines,
} = editorSlice.actions;

export const editorReducer = editorSlice.reducer;