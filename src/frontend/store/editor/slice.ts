import { createSlice } from "@reduxjs/toolkit";
import { EditorState } from "./types/EditorState";
import * as reducers from "./reducers";

const initialState: EditorState = {
  data: null,
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
  updateCharacter,
  addLine,
  addScene,
  importLines,
} = editorSlice.actions;

export const editorReducer = editorSlice.reducer;